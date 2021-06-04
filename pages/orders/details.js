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
import { BASE_URL } from 'etc/constants'
import { getOrderDetails } from 'services/api/order_services'
import EditAddress from 'components/widgets/dialog/EditAddress'
import EditTrackingNumber from 'components/widgets/dialog/EditTrackingNumber'
import EditDeliveryDate from 'components/widgets/dialog/EditDeliveryDate'

export default function OrderDetail(props) {
  const [totalPage, setTotalPage] = useState(0)
  const [filter, setFilter] = useState({ max_row: 3, keyword: "", page: 1 })
  const dispatch = useDispatch()
  const [order, setOrder] = useState()
  const [dialogAddressOpen, setDialogAddressOpen] = useState(false)
  const [dialogTrackingNumOpen, setDialogTrackingNumOpen] = useState(false)
  const [dialogDeliveryDateOpen, setDialogDeliveryDateOpen] = useState(false)

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
    const data = await getOrderDetails({ order_number: "ORD-113" })
    console.log("ldo", data)
    if (data.isSuccess) {
      setOrder(data.order)
    }
  }

  const handleChangeDownload = (e) => {
    const { id, value } = e.target
    console.log("handle change download ID:" + id + ", value:" + value)
    download({ type: value })
  }

  const closeAddress = () => {
    setDialogAddressOpen(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Header title="Orders" />
      <div>
        <div className="md:block glass p-4 rounded-none">
          <div className="flex flex-row text-N0 space-x-4 content-center">
            <div className="flex-1">Order ID: {order?.order_number}</div>
            <div className="flex-initial mr-8 pt-1">NT$15,000</div>
            <button className="flex-initial text-sm px-2 bg-transparent border-N0 border-2">EXPORT</button>
          </div>
          {/* Start Order List, Export Desktop */}
          {/* Ends of Order List, Export Desktop */}
          {/* Start Order List, Export Mobile */}
          {/* Ends of List order, Export Mobile */}
          {/* Start first row Mobile */}
          {/* Ends first row Mobile */}
          {/* Start Tabel (GlassDiv) */}
          {/* Ends Tabel (GlassDiv) */}
          {/* Pagination */}
          {/* <Pagination total={totalPage} forDispatch={{ type: 'order/list' }} onChangeInput={handleChange} /> */}
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
                      <span className="text-N300 text-sm">{order?.order_datetime}</span>
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
                      <select
                        id="shipping-status"
                        className="mt-2 rounded-md w400 focus:ring-1 focus:ring-N700 focus:outline-none bg-opacity-20 bg-N200">
                        <option>{order?.order_datetime}</option>
                        <option>-</option>
                      </select>
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
                      <select
                        id="shipping-status"
                        className="mt-2 rounded-md w400 focus:ring-1 focus:ring-N700 focus:outline-none bg-opacity-20 bg-N200">
                        <option>Pending</option>
                        <option>-</option>
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
                  <span className="text-N300 text-sm pt-2">{order?.shipping_address?.line1}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.line2}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.city}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.state}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.country}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.postal_code}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.phone_num}</span>
                  <span className="text-N300 text-sm">{order?.shipping_address?.person_name}</span>
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
                  <span className="text-N300 text-sm">{order?.order_delivery_date}</span>
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
                  />
                </div>
                <div className="flex flex-col text-N0">
                  Shipping Status
                  <select
                    id="shipping-status"
                    className="mt-2 rounded-md w400 focus:ring-1 focus:ring-N700 focus:outline-none bg-opacity-20 bg-N200">
                    <option>Pending</option>
                    <option>-</option>
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
          <div id="general" className="w-full glass p-4">
            <p>Invoice</p>
            <table className="table-auto text-N0 mt-4">
              <thead className="text-left font-normal text-sm">
                <tr>
                  <th className="w-3/12">Product</th>
                  <th className="w-3/12">Variant</th>
                  <th className="w-1/12">Cost</th>
                  <th className="w-1/12">Qty</th>
                  <th className="w-1/12">Taxes</th>
                  <th className="w-1/12">Shipping</th>
                  <th className="w-2/12">Total</th>
                  <th className="w-2/12">
                    {/* {action button} */}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td>Tekken 7</td>
                  <td>Japan Reg, PS4</td>
                  <td>$ 30.00</td>
                  <td>1</td>
                  <td>$ 0.00</td>
                  <td>$ 0.00</td>
                  <td>$ 50.00</td>
                  <td>
                    <div className="flex flex-row space-x-2">
                      <a><HiOutlinePencilAlt className="w-5 h-5" /></a>
                      <a><BiTrash className="w-5 h-5" /></a>
                    </div>
                  </td>
                </tr>
                <tr className="mt-2">
                  <td>Monster Hunter Rise</td>
                  <td>Japan Reg, Nintendo Switch</td>
                  <td>$ 60.00</td>
                  <td>1</td>
                  <td>$ 0.00</td>
                  <td>$ 0.00</td>
                  <td>$ 60.00</td>
                  <td>
                    <div className="flex flex-row space-x-2">
                      <a><HiOutlinePencilAlt className="w-5 h-5" /></a>
                      <a><BiTrash className="w-5 h-5" /></a>
                    </div>
                  </td>
                </tr>
                <tr className="mt-4">
                  <td>Dirt 5</td>
                  <td>US Reg, PS4</td>
                  <td>$ 30.00</td>
                  <td>1</td>
                  <td>$ 0.00</td>
                  <td>$ 0.00</td>
                  <td>$ 30.00</td>
                  <td>
                    <div className="flex flex-row space-x-2">
                      <a><HiOutlinePencilAlt className="w-5 h-5" /></a>
                      <a><BiTrash className="w-5 h-5" /></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-t-2 border-opacity-50 border-N0 text-N0 my-4 py-4">
              <div className="grid grid-cols-2">
                <div className="flex flex-1 flex-col">
                  <span>Coupon(s)</span>
                  <span>LICEWANG20</span>
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
                      <span>$ 100.00</span>
                      <span>- $ 20.00</span>
                      <span>$ 2.00</span>
                      <span>$ 1.00</span>
                      <span>$ 84.00</span>
                    </div>
                  </div>
                  <div id="second_calc" className="flex flex-row text-right border-t-2 border-N0 border-opacity-50 mt-4 py-4">
                    <div className="w-2/3  flex flex-col">
                      <span>Paid by Customer:</span>
                      <span>Gateway Fee:</span>
                      <span>Gateway Payout:</span>
                    </div>
                    <div className="w-1/3  flex flex-col">
                      <span>$ 84.00</span>
                      <span>- $ 5.00</span>
                      <span>$ 79.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row text-right border-t-2 border-N0 border-opacity-50 mt-4 py-4">
                <div className="flex flex-row flex-1 space-x-2">
                  <button className="flex-initial text-sm px-2 bg-transparent border-N400 text-N400 border-2" disabled>REFUND</button>
                  <button className="flex-initial text-sm px-2 bg-transparent border-N400 text-N400 border-2" disabled>ADD ITEMS</button>
                  <button className="flex-initial text-sm px-2 bg-transparent border-N400 text-N400 border-2" disabled>APPLY COUPON</button>
                </div>
                <span>This order is completed and no longer editable. </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row my-4 space-x-4">
            <div className="glass flex flex-col w-full">
              <p className="m-4">KOL</p>
              <table class="table-auto text-N0 m-4 mt-2">
                <thead className="text-left font-normal text-sm">
                  <tr>
                    <th className="w-3/12">Product</th>
                    <th className="w-3/12">KOL</th>
                    <th className="w-2/12">Cost</th>
                    <th className="w-1/12">Qty</th>
                    <th className="w-2/12">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td>Tekken 7</td>
                    <td>Lice Wang</td>
                    <td>$ 30.00</td>
                    <td>1</td>
                    <td>$ 50.00</td>
                  </tr>
                  <tr className="mt-2">
                    <td>Monster Hunter Rise</td>
                    <td>Charlene Yue</td>
                    <td>$ 60.00</td>
                    <td>1</td>
                    <td>$ 60.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="glass flex flex-col w-full">
              <p className="m-4">發票</p>
              <table class="table-auto text-N0 m-4 mt-2 ">
                <thead className="text-left font-normal text-sm">
                  <tr>
                    <th className="w-3/12">發票號碼</th>
                    <th className="w-3/12">發票號碼</th>
                    <th className="w-1/12">隨機碼</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td>PH41960752</td>
                    <td>3 May 2021</td>
                    <td>1742</td>
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
        order={order}
        open={dialogAddressOpen}
        onClose={closeAddress}
      />
      <EditTrackingNumber
        order={order}
        open={dialogTrackingNumOpen}
        onClose={() => setDialogTrackingNumOpen(false)}
      />
      <EditDeliveryDate
        order={order}
        open={dialogDeliveryDateOpen}
        onClose={() => setDialogDeliveryDateOpen(false)}
      />
    </>
  )
}