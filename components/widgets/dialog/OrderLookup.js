import React from 'react'
import { parseAddress } from 'utils/OrderUtils'
import Button from './Button'
import Dialog from './Dialog'
import moment from 'moment'
import router from 'next/router'
// interface Props {
//   title: string;
//   children: React.ReactNode;
//   open: boolean;
//   onClose: Function;
//   onConfirm: Function;
// }
export default function OrderLookup(props) {
  const { open, onClose, order } = props

  if (!open) {
    return <></>
  }

  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD'
  })

  const edit = (number) => {
    onClose()
    router.push('/orders/details?num=' + number)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="mb-8 flex flex-row ">
        <div className="text-xl text-BLACK mr-4 font-bold">{order.order_number}</div>
        <button className="text-xs bg-Y001">{order.order_status_payment}</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div id="left">
          <div className="mb-4">
            <div className="text-GREY1">Date & Time</div>
            <div>{moment(order.order_datetime).format('DD/MM/YYYY HH:mm:ss')}</div>
          </div>
          <div className="mb-4">
            <div className="text-GREY1">Billing</div>
            <div>{parseAddress(order)}</div>
          </div>
          <div>
            <div className="text-GREY1">Payment Via</div>
            <div>via Credit Card (ECPay)</div>
          </div>
        </div>
        <div id="right">
          <div className="mb-4">
            <div className="text-GREY1">Total</div>
            <div>{moneyFormat.format(order.total_price)}</div>
          </div>
          <div className="mb-4">
            <div className="text-GREY1">Email</div>
            <div>{order.email}</div>
          </div>
          <div>
            <div className="text-GREY1">Phone Number</div>
            <div>{order.shipping_address.phone_num}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button
            onClick={edit.bind(this, order.order_number)}
            className="text-xs text-N0 bg-secondary hover:bg-secondary-light"
          >
            EDIT ORDER
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
