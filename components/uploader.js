import Dropzone from 'react-dropzone-uploader'

export const DropzoneUploader = () => {
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <div className="mt-2 border-4">
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        inputContent="Drop A File"
      />
    </div>
  )
}