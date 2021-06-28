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
export default function Confirm(props) {
  const { open, onClose, title, children, onConfirm } = props
  if (!open) {
    return <></>
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="text-xl text-BLACK">{title}</div>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="bg-secondary hover:bg-secondary-light text-N0 text-sm"
          >
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            className="text-N0 text-sm"
            onClick={() => {
              onClose()
              onConfirm()
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
