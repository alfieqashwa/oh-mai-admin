import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiTrash } from 'react-icons/bi'
import { MdAddCircleOutline } from 'react-icons/md'
import { FiFilter } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useStore } from 'react-redux'
import Confirm from 'components/widgets/dialog/Confirm'
import { deleteOrders } from 'services/api/order_services'
import OrderLookup from 'components/widgets/dialog/OrderLookup'
import Link from 'next/link'

export function PromoList({ filter, page }) {
  console.log('/components/widget/pagination:filter', filter)
  const store = useStore()
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [lookupOpen, setLookupOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [maxRow, setMaxRow] = useState(10)
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(0)
  const [mTotal, setmTotal] = useState(0)

  useEffect(() => {
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: 0
        }
      }
    })
  }, [])

  // store.subscribe(async () => {
  //   const state = await store.getState()
  //   const totalRow = state.value?.totalRow || 0
  //   const orders = state.value.data
  //   setmTotal(totalRow)
  // });

  const showDeleteData = (orderNumber) => {
    setConfirmOpen(true)
    setSelectedDeleteOrder(orderNumber)
  }

  const doDeleteData = async () => {
    // put loader dialog while waiting
    const { strResult, isSuccess } = await deleteOrders({ order_number: selectedDeleteOrder })
    alert(strResult)

    if (isSuccess) {
      const newOrder = orders.filter(item => item.order_number !== selectedDeleteOrder)
      setOrders(newOrder)
    }
  }

  const lookupOrder = (order) => {
    setSelectedOrder(order)
    setLookupOpen(true)
  }

  const closeLookup = () => {
    setLookupOpen(false)
  }

  useEffect(() => {

  }, confirmOpen)

  store.subscribe(async () => {
    const state = await store.getState()
    const totalRow = state.value?.totalRow || 0
    const orders = state.value.data
    setmTotal(totalRow)
    const mTotalPage = Math.ceil(mTotal / maxRow)
    setTotalPage(mTotalPage)
    setOrders(orders)
    console.log('pagination/State change', state)
    console.log('pagination/totalRow', totalRow)
  })

  return (

    <>
      <div className="flex flex-row pt-4 pb-2 pl-4 space-x-2">
        <div className="text-N200 font-normal text-xl mr-4">View Promo Code</div>
        <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200">ALL</button>
        <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200">ACTIVE</button>
        <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200">DRAFT</button>
        <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200">ARCHIEVED</button>
      </div>
      <div className="items-center justify-start hidden md:flex p-4" >
        <div className="relative text-gray-600 focus-within:text-gray-400 w-1/3 mr-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline bg-transparent">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                </path>
              </svg>
            </button>
          </span>
          <input type="search" name="q" className="w-full py-2 text-base text-white bg-gray-900 rounded-md pl-10
            focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search..." autoComplete="off" />
        </div>
        <div className="space-x-2">
          <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200 inline-flex items-center">
            <BiTrash className="w-5 h-5 mr-2" />
            <span>DELETE</span>
          </button>
          <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200 inline-flex items-center">
            <MdAddCircleOutline className="w-5 h-5 mr-2" />
            <span>ADD CATEGORY</span>
          </button>
          <button className="bg-N200 text-base font-normal px-4 hover:bg-P700 hover:text-N200 inline-flex items-center">
            <FiFilter className="w-5 h-5 mr-2" />
            <span>FILTER</span>
          </button>
        </div>
      </div>
      <table className="md:min-w-full w-full">
        <thead className="bg-N0 bg-opacity-30">
          <tr>
            <th scope="col"
              className="px-4 py-3 font-normal text-left text-N0">
              Promo
            </th>
            <th scope="col"
              className="px-4 py-3 font-normal text-left text-N0"
            >
              Status
            </th>
            <th scope="col"
              className="px-4 py-3 font-normal text-left text-N0"
            >
              Start Date
            </th>
            <th scope="col"
              className="hidden px-4 py-3 font-normal text-left text-N0 md:table-cell"
            >
              End Date
            </th>
            <th scope="col"
              className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
            >
              Discount type
            </th>
            <th scope="col"
              className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {orders.map((o, i) => (
            <tr key={o.order_number}>
              <td className="p-4 whitespace-nowrap">
                <div className="text-sm text-N0 cursor-pointer" onClick={lookupOrder.bind(null, o)}>{'LICEWANG20'}</div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <button className="text-xs bg-Y001">{'Active'}</button>
              </td>
              <td className="p-4 md:table-cell whitespace-nowrap">
                <div className="text-sm text-G400">{moment(o.order_datetime).format('DD/MM/YYYY HH:mm:ss')}</div>

              </td>
              <td className="hidden p-4 text-sm md:table-cell text-N0">
                <p className="text-N0 opacity-70 text-sm">18/05/21 18:00</p>
              </td>
              <td className="hidden p-4 text-sm md:table-cell text-N0 whitespace-nowrap">{'Percentage Discount'}</td>
              <td className="hidden content-center align-middle p-4 whitespace-nowrap flex flex-row content-between md:flex">
                <Link href={'/orders/details?num=' + o.order_number} className="">
                  <HiOutlinePencilAlt className="w-5 h-5 text-N0 transition duration-200 ease-in-out hover:text-opacity-75 mr-4 cursor-pointer" />
                </Link>
                <a href="#" className="transition duration-200 ease-in-out text-N0 hover:text-opacity-75" onClick={showDeleteData.bind(null, o.order_number)}>
                  <BiTrash className="w-5 h-5" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Confirm
        title="Delete order?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={doDeleteData}
      >
        Are you sure you want to delete this order?
      </Confirm>
      <OrderLookup
        order={selectedOrder}
        open={lookupOpen}
        onClose={closeLookup}
      ></OrderLookup>
    </>
  )
}
