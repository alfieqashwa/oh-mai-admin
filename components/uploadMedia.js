import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

export function UploadMedia() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false
  })

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center h-64 my-2 border-2 border-opacity-50 border-dashed cursor-pointer rounded-md ${isDragActive ? "border-P700" : "border-N0"}`}
    >
      <input {...getInputProps()} />
      <FiUpload className="w-12 h-12 text-N200" />
      <button className="px-6 py-1 mt-4 bg-N200">Upload</button>
      <p className="mt-2 text-sm tracking-wider">or drop files to upload</p>
    </div >
  )
}