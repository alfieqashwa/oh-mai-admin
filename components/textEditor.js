import React, { useEffect, useMemo, useState } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
// Import the Slate editor factory.
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import RichEditor from './defunct/editproducthelper/richeditor'
import { DefaultEditor } from 'react-simple-wysiwyg';

// import { SlateEditor, SlateToolbar, SlateContent } from 'slate-editor'
// import { BoldPlugin, BoldButton } from '@slate-editor/bold-plugin'

// const plugins = [BoldPlugin()]

// const SlateRichTextEditor = () => (
//   <SlateEditor plugins={plugins}>
//     <SlateToolbar>
//       <BoldButton />
//     </SlateToolbar>

//     <SlateContent />
//   </SlateEditor>
// )

const TextEditor = props => {
  const { defaultValue, onChange } = props
  const [description, setDescription] = useState("abc")
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([])
  const [html, setHtml] = React.useState('');


  useEffect(() => {
    console.log("Edit Product/ TextEditor", props)

    if (defaultValue) {
      const domDesc = new DOMParser().parseFromString(defaultValue, "text/html")
      console.log("Isi dom desc", domDesc)

      setDescription(domDesc)
      setValue([
        {
          type: 'paragraph',
          children: [{ text: defaultValue }],
        },
      ])
      setHtml(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    console.log("Edit Product/ TextEditor description", description)
  }, [description])

  const updateDesc = (value) => {
    console.log("update desc")
    setDescription(value)
    onChange({target: {
      id: "description",
      value: value
    }})
  };

  function _onChange(e) {
    console.log("description e", e)
    setHtml(e.target.value);
    onChange({target: {
      id: "description",
      value: e.target.value
    }})
  }


  return (
    <div className="p-2 resize-x">
      {/* <SunEditor
        lang="en"
        name="description"
        setContents={description}
        width="100%"
        height="100%"
        autoFocus={true}
      /> */}
      {/* <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable />
      </Slate> */}
      {/* <RichEditor existingValue={description} updateDesc={updateDesc}/> */}
      <DefaultEditor value={html} onChange={_onChange} id="description" />
      {/* <SlateRichTextEditor /> */}
    </div>
  )
}

export default TextEditor