import React, { useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";

export default function RichEditor() {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable placeholder="Enter some plain text..." />
    </Slate>
  );
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
