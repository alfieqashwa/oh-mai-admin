import React from 'react'
import Image from 'next/image'

function CornersDiv(props) {
  const { className } = props
  return (
    <div className={`w-full h-full p-4 relative ${className}`}>
      <>
        <div className="absolute top-0 left-0 w-8 h-8">
          <Image src="/cornertopleft.png" width={30} height={30} />
        </div>
        <div className="absolute top-0 right-0 transform w-8 h-8">
          <Image src="/cornertopright.png" width={30} height={30} />
        </div>
        <div className="absolute bottom-0 left-0 transform w-8 h-8">
          <Image src="/cornerbottomleft.png" width={30} height={30} />
        </div>
        <div className="absolute bottom-0 right-0 transform w-8 h-8">
          <Image src="/cornerbottomright.png" width={30} height={30} />
        </div>
      </>
      {props.children}
    </div>
  )
}

CornersDiv.propTypes = {}

export default CornersDiv
