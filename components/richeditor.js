import React, { useMemo, useState, useCallback } from "react";
import { Editable, withReact, Slate, useSlate } from "slate-react";
import { Editor, createEditor, Transforms, Node, Text } from "slate";
import { withHistory } from "slate-history";
import { jsx } from "slate-hyperscript";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaQuoteLeft,
  FaListOl,
  FaListUl,
} from "react-icons/fa";

import { MdLooksOne, MdLooksTwo } from "react-icons/md";
import escapeHtml from "escape-html";
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRIKE: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes).map(deserialize).flat();

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

export default function RichEditor(props) {
  const { updateDesc, existingValue } = props;

  const [value, setValue] = useState(
    existingValue ? deserialize(existingValue.body) : initialValue
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  React.useEffect(() => {
    if (existingValue) {
      setValue(deserialize(existingValue.body));
      console.log(deserialize(existingValue.body));
    }
  }, [existingValue]);

  const serialize = (node) => {
    if (Text.isText(node)) {
      var val = escapeHtml(node.text);
      if (node.bold) val = `<strong>${val}</strong>`;
      if (node.code) {
        val = `<code>${val}</code>`;
      }
      if (node.italic) {
        val = `<em>${val}</em>`;
      }
      if (node.underline) {
        val = `<u>${val}</u>`;
      }
      if (node.strikethrough) {
        val = `<strike>${val}</strike>`;
      }
      return val;
    }

    const children = node.children.map((n) => serialize(n)).join("");

    switch (node.type) {
      case "block-quote":
        return `<blockquote><p>${children}</p></blockquote>`;
      case "bulleted-list":
        return `<ul>${children}</ul>`;
      case "heading-one":
        return `<h1>${children}</h1>`;
      case "heading-two":
        return `<h2>${children}</h2>`;
      case "list-item":
        return `<li>${children}</li>`;
      case "numbered-list":
        return `<ol>${children}</ol>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      default:
        return children;
    }
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        updateDesc(serialize(editor));
      }}
    >
      <div style={{ margin: " 10px 0px" }}>
        <MarkButton format="bold" icon={<FaBold />} />
        <MarkButton format="italic" icon={<FaItalic />} />
        <MarkButton format="underline" icon={<FaUnderline />} />
        <MarkButton format="strikethrough" icon={<FaStrikethrough />} />
        <MarkButton format="code" icon={<FaCode />} />
        <span className="editor-button" />
        <BlockButton format="heading-one" icon={<MdLooksOne />} />
        <BlockButton format="heading-two" icon={<MdLooksTwo />} />
        <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
        <BlockButton format="numbered-list" icon={<FaListOl />} />
        <BlockButton format="bulleted-list" icon={<FaListUl />} />
      </div>

      <div className="editor">
        <Editable
          placeholder="Enter a description of the product..."
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{ minHeight: "20vw" }}
        />
      </div>
    </Slate>
  );
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikethrough) {
    children = <strike>{children}</strike>;
  }

  return <span {...attributes}>{children}</span>;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <span
      className={
        isBlockActive(editor, format)
          ? "editor-button selected"
          : "editor-button not-selected"
      }
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </span>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <span
      className={
        isMarkActive(editor, format)
          ? "editor-button selected"
          : "editor-button not-selected"
      }
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </span>
  );
};
