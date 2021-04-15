import React from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TextEditor = props => {
  return (
    <div className="p-2">
      <SunEditor />
    </div>
  )
}

export default TextEditor