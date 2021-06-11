import { parseAddress } from 'utils/OrderUtils';
import Button from './Button';
import Dialog from './Dialog';
import moment from 'moment'
import { useEffect, useState } from 'react';

export default function EditTrackingNumber(props) {
  const { open, onClose, onChange, order, children, onConfirm } = props;

  if (!open) {
    return <></>;
  }

  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
  });

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="mt-2 ">
        <span>Tracking Number</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
          type="text"
          id="shipping_tracking_number"
          defaultValue={order?.shipping_tracking_number}
          placeholder=""
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={() => onClose()}
          className="text-xs text-N600 bg-N0">CANCEL</Button>
        <Button
          onClick={() => onConfirm()}
          className="text-xs text-N0 bg-secondary hover:bg-secondary-light">APPLY</Button>
      </div>
    </Dialog>
  );
}