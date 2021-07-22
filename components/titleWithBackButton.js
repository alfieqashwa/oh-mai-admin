import React from 'react'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export const TitleWithBackButton = ({ path, title }) => (
  <div className="flex items-center mt-20" >
    <Link href={path}>
      <a>
        <AiOutlineArrowLeft className="w-6 h-6 transition duration-300 ease-in-out text-N0 hover:text-P400" />
      </a>
    </Link>
    <h3 className="ml-4 capitalize w700">{title}</h3>
  </div>
)
