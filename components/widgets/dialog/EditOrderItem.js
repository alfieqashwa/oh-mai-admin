import React from 'react'
import Button from './Button'
import Dialog from './Dialog'
// interface Props {
//   title: string;
//   children: React.ReactNode;
//   open: boolean;
//   onClose: Function;
//   onConfirm: Function;
// }
export default function EditOrderItem(props) {
  const { open, onClose, orderItem, onConfirm, onChange } = props
  if (!open) {
    return <></>
  }

  const handleChange = (e) => {
    // console.log("handleChange: filter before update", filter)
    const { id, value } = e.target
    // console.log("handleChange: id", id)
    // console.log("handleChange: value", value)

    onChange(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const confirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="mb-8 flex flex-row ">
        <div className="text-xl text-BLACK mr-4">Update order item</div>
      </div>
      <div className="mt-2 ">
        <span>Product name</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-N300"
          type="text"
          defaultValue={orderItem?.order_item_name}
          placeholder=""
          disabled
        />
      </div>
      <div className="mt-2 ">
        <span>Quantity</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
          type="text"
          id="quantity"
          defaultValue={orderItem?.quantity}
          placeholder=""
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">

      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={() => onClose()}
          className="text-xs text-N600 bg-N0">CANCEL</Button>
        <Button
          onClick={confirm}
          className="text-xs text-N0 bg-secondary hover:bg-secondary-light">APPLY</Button>
      </div>
    </Dialog>
  )
}
