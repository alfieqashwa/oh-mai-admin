import { useDispatch } from 'react-redux'
import { checkLogin } from 'utils/Auth'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { GlassDefault } from 'components/glassDefault'
import { Header } from 'components/header'
import { FiFilter } from 'react-icons/fi'
import { PromoList } from 'components/promo/list'
import { Pagination } from 'components/widgets/pagination'

export default function OrdersPage() {
  // eslint-disable-next-line no-undef
  const [totalPage, setTotalPage] = useState(0)
  const [filter, setFilter] = useState({ max_row: 3, keyword: '', page: 1 })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    console.log('handleChange: filter before update', filter)
    const { id, value } = e.target
    console.log('handleChange: id', id)
    console.log('handleChange: value', value)

    setFilter(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    // search for keyword more than 3 chars, and serch all if keyword is empty chars is 0
    if ((filter.keyword.length > 3) || (filter.keyword.length === 0)) {
      dispatch({
        type: 'order/list',
        payload: {
          paging: {
            limit: 2,
            offset: 0,
            sort: filter.sort_by
          },
          filter: {
            order_number: filter.keyword,
            person_name: filter.keyword
          }
        }
      })
    }
  }, [filter.keyword])

  useEffect(() => {
    console.log('sort by', filter.sort_by)
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: 2,
          offset: 0,
          sort: filter.sort_by
        },
        filter: {
          order_number: filter.keyword,
          person_name: filter.keyword
        }
      }
    })
  }, [filter.sort_by])

  return (
    <>
      <Header title="Orders" />
      <div className="mx-4 md:mt-8 md:ml-6 md:mr-16 md:block">

        {/* Start Order List, Export Desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="space-x-0">
              <h3>Promo codes</h3>
            </div>

            <div className="space-x-8">
              <a className="" href="http://localhost:3002/order/download/4logistics_yesterday" >
                <button className="px-2.5 text-sm font-medium bg-transparent transition duration-200 ease-in-out text-N0">EXPORT</button>
              </a>
              <Link href="/products/promo-code/add-promocode">
                <a className="px-3.5 py-2.5 rounded text-sm font-medium bg-G400 hover:bg-G400 hover:opacity-75 transition duration-200 ease-in-out text-N0 whitespace-nowrap">ADD PROMO CODE</a>
              </Link>
            </div>
          </div>
        </div>
        {/* Ends of Order List, Export Desktop */}

        {/* Start Order List, Export Mobile */}
        <div className="md:hidden">
          <GlassDefault className="p-4 -mx-4 border rounded-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AiOutlineArrowLeft className="w-6 h-6 md:hidden text-N0" />
                <h5>Orders</h5>
              </div>
              <div className="flex flex-row space-x-4">
                <button className="text-sm bg-transparent text-N0">Export</button>
              </div>
            </div>
          </GlassDefault>
        </div>
        {/* Ends of List order, Export Mobile */}

        {/* Start first row Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mt-4">
            <h3 className="text-N0">Orders</h3>
            <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
              <FiFilter className="w-5 h-5" />
              <p className="text-xs text-N800">filter</p>
            </button>
          </div>
        </div>
        {/* Ends first row Mobile */}

        {/* Start Tabel (GlassDiv) */}
        <GlassDefault className="p-0 mt-4 border-2">
          <div className="flex flex-col">
            <div className="-my-2 md:overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg">

                  {/* Starts first row Desktop */}
                  {/* Ends first row Desktop */}

                  {/* Starts second row: Mobile */}
                  <div className="md:hidden">
                    <div className="flex items-center space-x-4">

                      <div className="py-4">
                        <select className="px-8 py-3 bg-opacity-0 border-0 text-BLACK bg-N200 text-N0"
                          id="sort_by"
                          onChange={handleChange}>
                          <option value={1}>Ascending</option>
                          <option value={0}>Descending</option>
                        </select>
                      </div>
                      <div className="relative w-full py-4 pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-5 h-5 top-7 text-N0 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          className="w-full pl-10 placeholder-opacity-50 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N0"
                          type="text" name="search" placeholder="Search for order"
                          defaultValue={filter.keyword || ''}
                          id="keyword"
                          onChange={handleChange} />
                      </div>

                    </div>
                  </div>
                  {/* Ends of second row: Mobile */}

                  {/* // PRODUCTS LIST */}
                  <div className="">
                    <PromoList setTotalPage={setTotalPage} filter={filter} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </GlassDefault>
        {/* Ends Tabel (GlassDiv) */}

        {/* Pagination */}
        <Pagination total={totalPage} forDispatch={{ type: 'order/list' }} onChangeInput={handleChange} />
      </div>
    </>
  )
}
