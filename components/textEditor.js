import React, { useEffect, useState } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TextEditor = props => {
  const { defaultValue } = props
  const [description, setDescription] = useState('')

  useEffect(() => {
    console.log("Edit Product/ TextEditor", props)

    if (defaultValue)
      setDescription(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    console.log("Edit Product/ TextEditor description", description)
  }, [description])


  return (
    <div className="p-2">
      <p>{description}</p>
      <SunEditor
        lang="en"
        name="description"
        setContents={description}
        width="100%"
        height="100%"
        autoFocus={true}
      />
    </div>
  )
}

export default TextEditor