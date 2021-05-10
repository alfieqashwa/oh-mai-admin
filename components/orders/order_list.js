import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { white } from 'tailwindcss/colors'
import { BiTrash } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { GET_LIST_ORDER_GQL } from 'graphql/order'
import { client } from 'lib/graphqlclient';
import moment from 'moment'


export function OrderList() {

  const [orders, setOrders] = useState([])
  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
  });

  useEffect(() => {
    client.request(GET_LIST_ORDER_GQL).then((data) => {
      console.log("Get list order success", data.orders)
      setOrders(data.orders)
    }).catch(err => console.log("Get list order error", err))
  }, [])

  const parseAddress = (order) => {
    const txtAddr = `${order.consumer.user.first_name} ${order.consumer.user.last_name}, ${order.shipping_address.line1}, 
    ${order.shipping_address.line2} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.country}`

    return txtAddr
  }

  return (
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
          <tr key={i}>
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
              <a href="#" className="transition duration-200 ease-in-out text-N0 hover:text-opacity-75">
                <BiTrash className="w-5 h-5" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const Pagination = props =>
  <div className="block pt-4 pb-8 md:items-center md:justify-end md:flex">

    <nav className="flex items-center justify-center space-x-6 text-N0">
      <ChevronDoubleLeftIcon className="w-5 h-5" />
      <ChevronLeftIcon className="w-5 h-5" />
      <button className="px-2.5 text-sm font-medium bg-P700 hover:bg-P700 transition duration-200 ease-in-out">1</button>
      <button className="px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">2</button>
      <button className="px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">3</button>
      <a className="px-2.5 py-1 text-sm font-medium rounded bg-N800 hover:bg-P700">...</a>
      <button className="px-2 text-sm font-medium bg-N800 hover:bg-P700">12</button>
      <ChevronRightIcon className="w-5 h-5" />
      <ChevronDoubleRightIcon className="w-5 h-5" />
    </nav>

    <div className="mt-2 text-center lg:mt-0 lg:text-none lg:mx-6">
      <p className="w350 text-N300 whitespace-nowrap">Showing <span className="font-medium text-N0">1</span> to <span className="font-medium text-N0">5</span> of <span className="font-medium text-N0">60</span> products</p>
    </div>

    <div className="items-center hidden lg:flex whitespace-nowrap">
      <p className="w350 text-N200">Show</p>
      <select type="number" name="show" className="w-16 px-2 py-1 mx-2 rounded-md bg-N100">
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
        <option>60</option>
      </select>
      <p className="w350 text-N200">at a time</p>
    </div>
  </div>