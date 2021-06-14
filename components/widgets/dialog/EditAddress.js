import { parseAddress } from 'utils/OrderUtils';
import Button from './Button';
import Dialog from './Dialog';
import moment from 'moment'
import { useEffect, useState } from 'react';
// interface Props {
//   title: string;
//   children: React.ReactNode;
//   open: boolean;
//   onClose: Function;
//   onConfirm: Function; 
// }
export default function EditAddress(props) {
  const { open, onClose, order, children, onConfirm, onChange } = props;
  if (!open) {
    return <></>;
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
        <div className="text-xl text-BLACK mr-4">Address</div>
      </div>
      <div className="mt-2 ">
        <span>Address Line 1</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
          type="text"
          id="shipping_line_1"
          defaultValue={order?.shipping_address?.shipping_line_1}
          placeholder=""
          onChange={handleChange}
        />
      </div>
      <div className="mt-2 ">
        <span>Address Line 2</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
          type="text"
          id="shipping_line_2"
          defaultValue={order?.shipping_address?.shipping_line_2}
          placeholder=""
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div id="left">
          <div className="mt-2 ">
            <span>Country</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="country"
              defaultValue={order?.shipping_address?.country}
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="mt-2 ">
            <span>City</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="city"
              defaultValue={order?.shipping_address?.city}
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="mt-2 ">
            <span>Phone Number</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="phone_num"
              defaultValue={order?.shipping_address?.phone_num}
              placeholder=""
              onChange={handleChange}
            />
          </div>
        </div>
        <div id="right">
          <div className="mt-2 ">
            <span>State</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="state"
              defaultValue={order?.shipping_address?.state}
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="mt-2 ">
            <span>Postal Code</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="postcode"
              defaultValue={order?.shipping_address?.postcode}
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="mt-2 ">
            <span>Name</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="person_name"
              defaultValue={order?.shipping_address?.person_name}
              placeholder=""
              onChange={handleChange}
            />
          </div>
        </div>
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
  );
}