// import { Fragment } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Header } from 'components/header'
import { GlassHeader } from 'components/glassHeader'
import { TitleWithBackButton } from 'components/titleWithBackButton'

// import { BsThreeDotsVertical } from 'react-icons/bs'
// import { Menu, Transition } from '@headlessui/react'
// import { FiDownloadCloud, FiSearch } from 'react-icons/fi'
// import { GlassDefault } from 'components/glassDefault'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Kol() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.kol && `/api/top-kol/${query.kol}`,
    fetcher
  )

  if (error) return <div className="grid h-screen text-5xl place-items-center"><p className="text-2xl text-N0">{error.message}</p></div>
  if (!data) return <div className="grid h-screen text-5xl place-items-center"><p className="text-2xl text-N0">loading...</p></div>

  return (
    <div className="pb-12 pr-12 pl-7">
      <Header title={`Top KOL - ${data.kol}`} />
      <GlassHeader title={data.kol}>
        <div className="flex space-x-4">
          <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
        </div>
      </GlassHeader>
      <TitleWithBackButton path="/analytics/summary/top-kol" title={`${data.kol} overview`} />
      <pre className="px-8 mt-8 text-md text-N200">{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}