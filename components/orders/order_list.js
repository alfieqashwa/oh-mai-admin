import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiTrash } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useStore } from 'react-redux'
import Confirm from 'components/widgets/dialog/Confirm'
import { deleteOrders } from 'services/api/order_services'
import { parseAddress } from 'utils/OrderUtils'
import OrderLookup from 'components/widgets/dialog/OrderLookup'
import Link from 'next/link'

export function OrderList({ filter, page }) {
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

  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD'
  })

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
      <table className="md:min-w-full w-full">
        <thead className="bg-N0 bg-opacity-30">
          <tr>
            <th scope="col"
              className="px-4 py-3 font-normal text-left text-N0">
              Order No.
          </th>
            <th scope="col"
              className="px-4 py-3 font-normal text-left text-N0"
            >
              Date & Time
          </th>
            <th scope="col"
              className="px-4 py-3 font-normal text-left text-N0"
            >
              Status
          </th>
            <th scope="col"
              className="hidden px-4 py-3 font-normal text-left text-N0 md:table-cell"
            >
              Billing
          </th>
            <th scope="col"
              className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
            >
              Total
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
                <div className="text-sm text-N0 cursor-pointer" onClick={lookupOrder.bind(null, o)}>{o.order_number}</div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="text-sm text-G400">{moment(o.order_datetime).format('DD/MM/YYYY HH:mm:ss')}</div>
              </td>
              <td className="p-4 md:table-cell whitespace-nowrap">
                <button className="text-xs bg-Y001">{o.order_status_payment}</button>
              </td>
              <td className="hidden p-4 text-sm md:table-cell text-N0">
                <p className="text-N0 text-xs">{parseAddress(o)}</p>
                <p className="text-N0 opacity-70 text-sm">via Credit Card (ECPay)</p>
              </td>
              <td className="hidden p-4 text-sm md:table-cell text-N0 whitespace-nowrap">{moneyFormat.format(o.total_price)}</td>
              <td className="hidden content-center align-middle p-4 whitespace-nowrap flex flex-row content-between md:flex">
                <Link href={'/orders/details?num=' + o.order_number} className="">
                  <HiOutlinePencilAlt className="w-5 h-5 text-N0 transition duration-200 ease-in-out text-N0 hover:text-opacity-75 mr-4 cursor-pointer" />
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
