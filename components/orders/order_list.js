import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { white } from 'tailwindcss/colors'
import { BiTrash } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useStore } from 'react-redux'
import { order } from 'tailwindcss/defaultTheme'
import Confirm from 'components/widgets/dialog/Confirm'
import { deleteOrders } from 'services/api/order_services'

export function OrderList({ filter, page }) {
  console.log("/components/widget/pagination:filter", filter)
  const store = useStore()
  const [orders, setOrders] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState("")

  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
  });

  useEffect(() => {
  }, [])

  const parseAddress = (order) => {
    const txtAddr = `${order.person_name}, ${order.shipping_address.line1}, 
    ${order.shipping_address.line2} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.country}`

    return txtAddr
  }

  store.subscribe(async () => {
    const state = await store.getState()
    console.log("order_list/State change", state)

    const listOrders = state.value.data
    setOrders(listOrders)
  });

  const showDeleteData = (orderNumber) => {
    setConfirmOpen(true)
    setSelectedDeleteOrder(orderNumber)
  }

  const doDeleteData = async () => {
    // put loader dialog while waiting
    const {strResult, isSuccess} = await deleteOrders({order_number: selectedDeleteOrder})
    alert(strResult)

    if (isSuccess) {
      let newOrder = orders.filter(item => item.order_number !== selectedDeleteOrder)
      setOrders(newOrder)
    }
  }

  useEffect(() => {

  }, confirmOpen)

  return (

    <>
      <table className="md:min-w-full w-full">
        <thead className="bg-N0 bg-opacity-30">
          <tr>
            <th scope="col"
              className="hidden py-3 px-4 text-left md:table-cell text-N0">
              S/N
          </th>
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
              <td className="hidden py-4 px-4 whitespace-nowrap md:table-cell text-N0">
                {i + 1}
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="text-sm text-N0">{o.order_number}</div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="text-sm text-G400">{moment(o.order_datetime).format("DD/MM/YYYY HH:mm:ss")}</div>
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
                <a href="#" className="transition duration-200 ease-in-out text-N0 hover:text-opacity-75">
                  <HiOutlinePencilAlt className="w-5 h-5" />
                </a>
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
    </>
  )
}
