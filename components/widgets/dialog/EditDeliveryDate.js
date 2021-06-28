import React from 'react'
import { toReadableDate } from 'utils/OrderUtils'
import Button from './Button'
import Dialog from './Dialog'

export default function EditDeliveryDate(props) {
  const { open, onClose, order, onChange, onConfirm } = props
  if (!open) {
    return <></>
  }

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="mt-2 ">
        <span>Order Delivery Date</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
          type="text"
          id="shipping_tracking_number"
          defaultValue={toReadableDate(order?.order_delivery_date)}
          onChange={handleChange}
          placeholder=""
        />
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={onClose}
          className="text-xs text-N600 bg-N0">CANCEL</Button>
        <Button
          onClick={onConfirm}
          className="text-xs text-N0 bg-secondary hover:bg-secondary-light">APPLY</Button>
      </div>
    </Dialog>
  )
}
