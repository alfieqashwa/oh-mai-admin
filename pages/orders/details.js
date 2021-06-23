import { Menu, Transition } from '@headlessui/react'
import { BiTrash } from 'react-icons/bi'
import { MdAddCircleOutline } from 'react-icons/md'
import { FiFilter } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import { GlassDefault } from 'components/glassDefault'
import { Header } from 'components/header'
import { ProductListTable, InventoryMobileView } from 'components/products/inventory'
import { OrderList } from 'components/orders/order_list'
import { useState } from 'react'
import { Pagination } from 'components/widgets/pagination'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL, PAYMENT_STATUS_ARR, SHIPPING_STATUS_ARR } from 'etc/constants'
import { deleteOrderItem, getOrderDetails, updateOrder, updateOrderItem } from 'services/api/order_services'
import EditAddress from 'components/widgets/dialog/EditAddress'
import EditOrderItem from 'components/widgets/dialog/EditOrderItem'
import EditTrackingNumber from 'components/widgets/dialog/EditTrackingNumber'
import EditDeliveryDate from 'components/widgets/dialog/EditDeliveryDate'
import DatePicker from "react-datepicker";
import { setHours } from 'date-fns'
import { setMinutes } from 'date-fns'
import { toReadableDate, toReadableDateTime } from 'utils/OrderUtils'
import { DateTime } from 'luxon'
require('react-datepicker/dist/react-datepicker.css')

const moneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'TWD',
});

export default function OrderDetail(props) {
  const [totalPage, setTotalPage] = useState(0)
  const [filter, setFilter] = useState({ max_row: 3, keyword: "", page: 1 })
  const dispatch = useDispatch()
  const [order, setOrder] = useState(null)
  const [dialogAddressOpen, setDialogAddressOpen] = useState(false)
  const [dialogTrackingNumOpen, setDialogTrackingNumOpen] = useState(false)
  const [dialogDeliveryDateOpen, setDialogDeliveryDateOpen] = useState(false)
  const [dialogOrderItemOpen, setDialogOrderItemOpen] = useState(false)
  const [orderStatusPayment, setOrderStatusPayment] = useState()
  const [trackingNumber, setTrackingNumber] = useState()
  const [deliveryDate, setDeliveryDate] = useState()
  const [shippingStatus, setShippingStatus] = useState()
  const [shippingCost, setShippingCost] = useState()
  const [address, setAddress] = useState()
  const [subTotalKol, setSubtotalKol] = useState(0)
  const [itemSubtotal, setItemSubtotal] = useState(0)
  const [totalTax, setTotalTax] = useState(0)
  const [selectedOrderItem, setSelectedOrderItem] = useState()
  const [totalPerKolEarning, setTotalPerKolEarning] = useState()
  const [orderDate, setOrderDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  )
  const date = new Date()

  const handleChange = (e) => {
    console.log("handleChange: filter before update", filter)
    const { id, value } = e.target
    console.log("handleChange: id", id)
    console.log("handleChange: value", value)

    setFilter(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const loadData = async () => {
    const data = await getOrderDetails({ order_number: "ORD8L4OERJ98" })
    console.log("ldo", data)
    if (data.isSuccess) {
      await setOrder(data.order)
    }
  }

  const _updateOrder = async (order) => {
    const data = await updateOrder(order)
    console.log("updateOrder", data)
    if (data.isSuccess) {
      // setOrder(data.order)
      console.log("updateOrder", "Done")
    }
  }

  const handleChangeDownload = (e) => {
    const { id, value } = e.target
    console.log("handle change download ID:" + id + ", value:" + value)
    download({ type: value })
  }

  const orderDateChange = async (date) => {
    setOrderDate(date)
  }

  const paymentStatusChange = async (e) => {
    setOrderStatusPayment(e.target.value)
  }

  const shippingStatusChange = (e) => {
    setShippingStatus(e.target.value)
  }

  const shippingCostChange = (e) => {
    setShippingCost(e.target.value)
  }

  const changeTrackingNumber = () => {
    _updateOrder({
      shipping_tracking_number: trackingNumber,
      order_id: order.order_id
    })
    setDialogTrackingNumOpen(false)
  }

  const changeAddress = () => {
    _updateOrder({
      shipping_line_1: address.shipping_line_1,
      shipping_line_2: address.shipping_line_2,
      city: address.city,
      state: address.state,
      country: address.country,
      postcode: address.postcode,
      phone_num: address.phone_num,
      person_name: address.person_name,
      order_id: order.order_id
    })
    setDialogTrackingNumOpen(false)
  }

  const changeDeliveryDate = () => {
    // deliveryDate format : '24 Dec 2023'
    _updateOrder({
      order_delivery_date: DateTime.fromFormat(deliveryDate, "dd MMM yyyy"),
      order_id: order.order_id
    })
    setDialogDeliveryDateOpen(false)
  }

  const closeAddress = () => {
    setDialogAddressOpen(false)
  }

  const closeOrderItem = () => {
    setDialogOrderItemOpen(false)
  }

  const openOrderItem = (oi) => {
    console.log("OI:", oi)
    setDialogOrderItemOpen(true)
    setSelectedOrderItem(oi)
  }

  const _updateOrderItem = async (oi) => {
    console.log("update order item")
    const result = await updateOrderItem(oi)

    if (result.isSuccess) {
      loadData()
    }
    console.log("result", result)
  }

  const _deleteOrderItem = async (id) => {
    console.log("update order item")
    const result = await deleteOrderItem(id)

    if (result.isSuccess) {
      loadData()
    }
    console.log("result", result)
  }

  const calculateKolSubtotal = (order) => {
    let subtotalKl = 0
    let itemSubttl = 0
    let ttlTax = 0
    const perKolEarning = []
    const arrFapiao = []

    order?.order_item?.map(oi => {
      if (oi.kol) {
        subtotalKl += oi?.order_item_kol_profit_earning * oi?.quantity

        if (perKolEarning.length === 0) {
          let earning = {
            kol: oi.kol,
            earning: (oi?.order_item_kol_profit_earning || 0) * oi?.quantity // this zero validation should be done serverside before
          }

          perKolEarning.push(earning)
        }

        perKolEarning.map(item => {
          if (item.kol === oi.kol) {
            item.kol.earning = item.kol.earning + ((oi?.order_item_kol_profit_earning || 0) * oi?.quantity)
          } else {
            let earning = {
              kol: oi.kol,
              earning: (oi?.order_item_kol_profit_earning || 0) * oi?.quantity
            }

            perKolEarning.push(earning)
          }
        })
      }

      itemSubttl += oi?.price * oi?.quantity
      ttlTax += oi?.tax * oi?.quantity
    })

    setItemSubtotal(itemSubttl)
    setSubtotalKol(subtotalKl)
    setTotalTax(ttlTax)
    setTotalPerKolEarning(perKolEarning)
  }

  useEffect(() => {
    loadData()
    console.log("// orderdate", orderDate)
  }, [])

  useEffect(() => {
    if (order) {
      if (order.order_datetime instanceof Date) {
        console.log("// Instance of date")
      } else {
        console.log("// Not date")
      }
      console.log("// Order date", order.order_datetime)
      console.log("// Order date stringify", JSON.stringify(order.order_datetime))

      var t = order.order_datetime.split(/[- :]/);
      console.log("// dateParts", t)

      var jsDate = new Date(order.order_datetime)
      const lxDate = DateTime.fromJSDate(jsDate)

      console.log("// order.order_datetime", typeof order.order_datetime)
      console.log("// jsDate", jsDate)
      console.log("// jsDate typeof", typeof jsDate)
      console.log("// lxDate", lxDate)
      setOrderDate(jsDate)
      setOrderStatusPayment(order.order_status_payment)
      setDeliveryDate(order.order_delivery_date)
      setAddress({
        shipping_line_1: order.shipping_address.line1,
        shipping_line_2: order.shipping_address.line2,
        country: order.shipping_address.country,
        city: order.shipping_address.city,
        phone_num: order.shipping_address.phone_num,
        state: order.shipping_address.state,
        postcode: order.shipping_address.postal_code,
        person_name: order.shipping_address.person_name
      })

      calculateKolSubtotal(order)
    }
  }, [order])

  const dateCreatedSelect = async (e) => {
    console.log("dateCreatedSelect..")
    console.log("dateCreatedSelect", e)

    if (order) {
      await _updateOrder({
        order_datetime: e,
        order_id: order.order_id
      })
    }
  }

  useEffect(async () => {
    if (order) {
      const jsDate = new Date(orderDate)

      await _updateOrder({
        order_datetime: jsDate,
        order_id: order.order_id
      })
    }
  }, [orderDate])

  useEffect(async () => {
    if (order) {
      await _updateOrder({
        order_status_payment: orderStatusPayment,
        order_id: order.order_id
      })
    }
  }, [orderStatusPayment])

  useEffect(async () => {
    if (order) {
      await _updateOrder({
        order_status_shipping: shippingStatus,
        order_id: order.order_id
      })
    }
  }, [shippingStatus])

  useEffect(async () => {
    console.log("//shippingCost", shippingCost)

    if (order && (shippingCost !== "")) {
      await _updateOrder({
        shipping_cost: shippingCost,
        order_id: order.order_id
      })
    }
  }, [shippingCost])

  useEffect(async () => {
    console.log("//address", address)

    if (address) {
      console.log("//address filled", address)
    }
  }, [address])

  return (
    <>
      <Header title="Orders" />
      <div>
        <div className="flex md:block glass p-4 rounded-none">
          <div className="flex flex-row text-N0 space-x-4 content-center">
            <div className="flex-1">Order ID: {order?.order_number}</div>
            <div className="flex-initial mr-8 pt-1">{moneyFormat.format(order?.total_price)}</div>
            <a href={process.env.NEXT_PUBLIC_BACKEND_HOST + "/order/download/order_detail?order_number=" + order?.order_number}>
              <button className="flex-initial text-sm px-2 bg-transparent border-N0 border-2">EXPORT</button>
            </a>
          </div>
        </div>
        <div className="px-8">
          <div className="flex flex-row text-N0 space-x-4 py-4 content-center">
            <AiOutlineArrowLeft className="w-6 h-8 transition duration-300 ease-in-out text-N0 hover:text-P400" />
            <div className="text-2xl text-N0 font-bold">{order?.order_number}</div>
            <button className="flex-initial text-sm px-2 font-thin" disabled>{order?.order_status_payment}</button>
          </div>
          <div className="flex flex-row my-4 space-x-4">
            <div id="general" className="w-3/5 glass p-4">
              <p className="text-xl">General</p>
              <div className="flex-col">
                <div className="grid grid-cols-3">
                  <div id="cols1" className="">
                    <div className="flex flex-col pt-4">
                      <span className="flex-1 text-N0">Order Number</span>
                      <span className="text-N300 text-sm">{order?.order_number}</span>
                    </div>
                    <div className="flex flex-col pt-4">
                      <span className="flex-1 text-N0">Customer ID</span>
                      <span className="text-N300 text-xs">{order?.consumer?.id}</span>
                    </div>
                  </div>
                  <div id="cols2" className="">
                    <div className="flex flex-col pt-4">
                      <span className="text-N0">Order Date Time</span>
                      <span className="text-N300 text-sm">{toReadableDateTime(order?.order_datetime)}</span>
                    </div>
                    <div className="flex flex-col pt-4">
                      <span className="text-N0">Customer Name</span>
                      <span className="text-N300 text-sm">{order?.consumer?.user?.first_name + " " + order?.consumer?.user?.last_name}</span>
                    </div>
                  </div>
                  <div id="cols2" className="">
                    <div className="flex flex-col pt-4">
                      <span className="text-N0">Payment Method</span>
                      <span className="text-N300 text-sm">{order?.payment_type + " - " + order?.payment_gateway}</span>
                    </div>
                    <div className="flex flex-col pt-4">
                      <span className="text-N0">Charge ID</span>
                      <span className="text-N300 text-sm">{order?.charge_id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t-2 mt-8 border-N0 border-opacity-50">
                  <div className="flex-1 grid grid-cols-2 pt-4 space-x-4">
                    <div className="flex flex-col text-N0">
                      <span >Date created</span>
                      <div className="flex flex-1">
                        <DatePicker
                          portalId="root-portal"
                          style={{ position: "relative", zIndex: "999!important" }}
                          className="flex flex-1 mt-2 rounded-md text-N0 bg-opacity-20 bg-N0 w-full"
                          wrapperClassName="w-full"
                          calendarClassName="w-full"
                          selected={orderDate}
                          onChange={orderDateChange}
                          showTimeSelect
                          // minTime={setHours(setMinutes(new Date(), 0), 17)}
                          // maxTime={setHours(setMinutes(new Date(), 30), 20)}
                          dateFormat="dd MMM yyyy, hh:mm"
                        />
                      </div>
                      <div className="flex flex-row pt-4">
                        <span className="text-N0 flex-1">Billing</span>
                        <span className="text-N0"><HiOutlinePencilAlt className="w-6 h-6" /></span>
                      </div>
                      <span className="text-N300 text-sm pt-2">{order?.person_name}</span>
                      <span className="text-N300 text-sm">{order?.shipping_address?.line1}</span>
                      <span className="text-N300 text-sm">{order?.shipping_address?.line2}</span>
                      <span className="text-N300 text-sm">{order?.shipping_address?.city}</span>
                      <span className="text-N300 text-sm">{order?.shipping_address?.state + ", " + order?.shipping_address?.country + "," + order?.shipping_address?.postal_code}</span>
                    </div>
                    <div className="flex flex-col text-N0">
                      <span>Order Status</span>
                      {/* Payment status */}
                      <select
                        id="shipping-status"
                        className="mt-2 rounded-md w400 focus:ring-1 focus:ring-N700 focus:outline-none bg-opacity-20 bg-N200"
                        onChange={paymentStatusChange}>
                        {PAYMENT_STATUS_ARR.map(item => {
                          return <option className="capitalize" selected={orderStatusPayment == item} value={item}>{item}</option>
                        })}
                      </select>
                      <div className="flex flex-col pt-4">
                        <span className="text-N0">Email Address</span>
                        <span className="text-N300 text-sm">{order?.email}</span>
                      </div>
                      <div className="flex flex-col pt-4">
                        <span className="text-N0">Phone Number</span>
                        <span className="text-N300 text-sm">{order?.shipping_address?.phone_num}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="shipping" className="w-2/5 glass p-4">
              <p>Shipping</p>
              <div className="grid grid-cols-2 pt-4 space-x-2">
                <div className="flex flex-col ">
                  <div className="flex flex-row">
                    <span className="text-N0 flex-1">Address</span>
                    <span className="text-N0 cursor-pointer"
                      onClick={() => setDialogAddressOpen(true)}><HiOutlinePencilAlt className="w-6 h-6" /></span>
                  </div>
                  <span className="text-N300 text-sm pt-2">{address?.line1}</span>
                  <span className="text-N300 text-sm">{address?.line2}</span>
                  <span className="text-N300 text-sm">{address?.city}</span>
                  <span className="text-N300 text-sm">{address?.state}</span>
                  <span className="text-N300 text-sm">{address?.country}</span>
                  <span className="text-N300 text-sm">{address?.postal_code}</span>
                  <span className="text-N300 text-sm">{address?.phone_num}</span>
                  <span className="text-N300 text-sm">{address?.person_name}</span>
                </div>
                <div className="flex flex-col ">
                  <div className="flex flex-row">
                    <span className="text-N0 flex-1">Tracking Number</span>
                    <span className="text-N0 cursor-pointer"
                      onClick={() => setDialogTrackingNumOpen(true)}><HiOutlinePencilAlt className="w-6 h-6" /></span>
                  </div>
                  <span className="text-N300 text-sm">{order?.shipping_tracking_number}</span>
                  <div className="flex flex-row pt-2">
                    <span className="text-N0 flex-1">Order Delivery Date</span>
                    <span className="text-N0 cursor-pointer"
                      onClick={() => setDialogDeliveryDateOpen(true)}><HiOutlinePencilAlt className="w-6 h-6" /></span>
                  </div>
                  <span className="text-N300 text-sm">{toReadableDate(deliveryDate)}</span>
                  <span className="text-N0 mt-2">Ship by</span>
                  <span className="text-N300 text-sm">{order?.shipping_company}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 pt-4 space-x-2">
                <div className="flex flex-col text-N0">
                  Shipping Cost
                  <input
                    className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200"
                    type="text"
                    id="shipping_cost"
                    placeholder="$ 0"
                    onChange={shippingCostChange}
                    defaultValue={order?.shipping_cost}
                  />
                </div>
                <div className="flex flex-col text-N0">
                  Shipping Status
                  <select
                    id="shipping-status"
                    onChange={shippingStatusChange}
                    className="mt-2 rounded-md w400 focus:ring-1 focus:ring-N700 focus:outline-none bg-opacity-20 bg-N200">
                    {SHIPPING_STATUS_ARR.map(item => {
                      return <option className="capitalize" value={item}>{item}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-2 text-N0">
                Shipping Tracking URL
                <input
                  className="w-full mt-2 rounded-md text-N0 bg-opacity-20 bg-N200"
                  type="text"
                  id="shipping_cost"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div id="general" className="w-full glass p-4 z-0 relative">
            <p>Invoice</p>
            <table className="table-auto text-N0 mt-4">
              <thead className="text-left font-normal text-sm">
                <tr>
                  <th className="w-5/12">Product</th>
                  <th className="w-2/12">Cost</th>
                  <th className="w-1/12">Qty</th>
                  <th className="w-2/12">Taxes</th>
                  <th className="w-2/12">Total</th>
                  <th className="w-2/12">
                    {/* {action button} */}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {order?.order_item?.map(oi => {
                  return (
                    <tr>
                      <td>{oi?.order_item_name}</td>
                      <td>{moneyFormat.format(oi?.price)}</td>
                      <td>{oi?.quantity}</td>
                      <td>{moneyFormat.format(oi?.tax || 0)}</td>
                      <td>{moneyFormat.format(oi?.price * oi?.quantity)}</td>
                      <td>
                        <div className="flex flex-row space-x-2">
                          <a onClick={openOrderItem.bind(this, oi)} className="cursor-pointer"><HiOutlinePencilAlt className="w-5 h-5" /></a>
                          <a className="cursor-pointer" onClick={_deleteOrderItem.bind(this, oi?.order_item_id)}><BiTrash className="w-5 h-5" /></a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="border-t-2 border-opacity-50 border-N0 text-N0 my-4 py-4">
              <div className="grid grid-cols-2">
                <div className="flex flex-1 flex-col">
                  <span>Coupon(s)</span>
                  <span>{/** LICEWANG20 */}</span>
                </div>
                <div className="flex flex-col">
                  <div id="first_calc" className="flex flex-row  text-right">
                    <div className="w-2/3  flex flex-col">
                      <span>Item subtotal:</span>
                      <span>Coupons:</span>
                      <span>Shipping:</span>
                      <span>Taxes:</span>
                      <span>Order Total:</span>
                    </div>
                    <div className="w-1/3  flex flex-col">
                      <span>{moneyFormat.format(itemSubtotal)}</span>
                      <span>- {moneyFormat.format(0) /** coupon is not implemented yet*/} </span>
                      <span>{moneyFormat.format(order?.shipping_cost)}</span>
                      <span>{moneyFormat.format(totalTax)}</span>
                      <span>{moneyFormat.format(itemSubtotal + totalTax + order?.shipping_cost - totalTax)}</span>
                    </div>
                  </div>
                  <div id="second_calc" className="flex flex-row text-right border-t-2 border-N0 border-opacity-50 mt-4 py-4">
                    <div className="w-2/3  flex flex-col">
                      <span>Paid by Customer:</span>
                      <span>Gateway Fee:</span>
                      <span>Gateway Payout:</span>
                    </div>
                    <div className="w-1/3  flex flex-col">
                      <span>{moneyFormat.format(order?.total_price)}</span>
                      <span>{moneyFormat.format(order?.payment_type_charge_fee)}</span>
                      <span>{moneyFormat.format(order?.total_price - order?.payment_type_charge_fee)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row text-right border-t-2 border-N0 border-opacity-50 mt-4 py-4">
                <div className="flex flex-row flex-1 space-x-2">
                  <button className="flex-initial text-sm px-2 bg-transparent border-N400 text-N400 border-2" disabled>REFUND</button>
                  {/* <button className="flex-initial text-sm px-2 bg-transparent border-N400 text-N400 border-2" disabled>ADD ITEMS</button> */}
                  <button className="flex-initial text-sm px-2 bg-transparent border-N400 text-N400 border-2" disabled>APPLY COUPON</button>
                </div>
                <span>This order is completed and no longer editable. </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row my-4 space-x-4 pb-8">
            <div className="glass flex flex-col w-full">
              <p className="m-4">KOL</p>
              <table className="table-auto text-N0 m-4 mt-2">
                <thead className="text-left font-normal text-sm">
                  <tr>
                    <th className="w-4/12">Product</th>
                    <th className="w-2/12">KOL</th>
                    <th className="w-2/12">Cost</th>
                    <th className="w-1/12">Qty</th>
                    <th className="w-2/12">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {order?.order_item?.map(oi => {
                    if (oi.kol) {
                      return (
                        <tr>
                          <td>{oi?.order_item_name}</td>
                          <td>{oi?.kol?.display_name}</td>
                          <td>{moneyFormat.format(oi?.order_item_kol_profit_earning)}</td>
                          <td>{oi?.quantity}</td>
                          <td>{moneyFormat.format(oi?.order_item_kol_profit_earning * oi?.quantity)}</td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table>
              <div className="border-t-2 border-N0 border-opacity-50 mx-4 flex flex-col text-N0 justify-end">
                <div className="text-right m-4">
                  Subtotal {moneyFormat.format(subTotalKol)}
                </div>
                {
                  totalPerKolEarning?.map(item => {
                    return (
                      <div className="text-right m-4">
                        {item.kol?.display_name} {moneyFormat.format(item.earning)}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="glass flex flex-col w-full">
              <p className="m-4">發票</p>
              <table className="table-auto text-N0 m-4 mt-2 ">
                <thead className="text-left font-normal text-sm">
                  <tr>
                    <th className="w-3/12">發票號碼</th>
                    <th className="w-3/12">發票號碼</th>
                    <th className="w-1/12">隨機碼</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td>{order?.invoice_num}</td>
                    <td>{toReadableDate(order?.invoice_date)}</td>
                    <td>{order?.invoice_random_num}</td>
                  </tr>
                </tbody>
              </table>
              <div className="m-4">
                <button className="flex-grow-0 text-sm px-2 bg-transparent border-N0 text-N0 border-2">顯示發票</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditAddress
        order={{ shipping_address: address }}
        open={dialogAddressOpen}
        onClose={closeAddress}
        onChange={setAddress}
        onConfirm={changeAddress}
      />
      <EditOrderItem
        orderItem={selectedOrderItem}
        open={dialogOrderItemOpen}
        onClose={closeOrderItem}
        onChange={setSelectedOrderItem}
        onConfirm={_updateOrderItem.bind(this, selectedOrderItem)}
      />
      <EditTrackingNumber
        order={order}
        open={dialogTrackingNumOpen}
        onClose={() => setDialogTrackingNumOpen(false)}
        onChange={setTrackingNumber}
        onConfirm={changeTrackingNumber}
      />
      <EditDeliveryDate
        order={{ order_delivery_date: deliveryDate }}
        open={dialogDeliveryDateOpen}
        onClose={() => setDialogDeliveryDateOpen(false)}
        onChange={setDeliveryDate}
        onConfirm={changeDeliveryDate}
      />
    </>
  )
}