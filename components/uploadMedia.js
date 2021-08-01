import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

export function UploadMedia() {
  const [files, setFiles] = useState([])
  // const onDrop = useCallback(acceptedFiles => {
  //   console.log(acceptedFiles)
  // }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    },
    accept: 'image/*',
    multiple: false
  })

  useEffect(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div
      {...getRootProps()}
      className={`relative flex flex-col items-center justify-center h-64 my-2 border-2 border-opacity-50 border-dashed cursor-pointer rounded-md ${isDragActive ? 'border-P700' : 'border-N0'}`}
    >
      <input {...getInputProps()} />
      <FiUpload className="w-12 h-12 text-N200" />
      {/* TODO: temporary image preview style until have a fixed design  */}
      {files.map(file => (
        <aside key={file.name} className="absolute top-0 left-0">
          <img
            className="object-cover object-center w-full mx-auto mt-2 rounded max-h-60"
            src={file.preview}
            alt="upload"
          />
        </aside>
      ))}
      <button className="px-6 py-1 mt-4 bg-N200">Upload</button>
      <p className="mt-2 text-sm tracking-wider">or drop files to upload</p>
    </div >
  )
}
