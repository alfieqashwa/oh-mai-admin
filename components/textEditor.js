import React from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TextEditor = props => {
  return (
    <div className="p-2">
      <SunEditor
        lang="en"
        name="description"
        defaultValue="<p>Enter description here</p>"
        width="100%"
        height="100%"
        autoFocus={true}
      />
    </div>
  )
}

export default TextEditor