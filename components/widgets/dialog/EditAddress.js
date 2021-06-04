import { parseAddress } from 'utils/OrderUtils';
import Button from './Button';
import Dialog from './Dialog';
import moment from 'moment'
// interface Props {
//   title: string;
//   children: React.ReactNode;
//   open: boolean;
//   onClose: Function;
//   onConfirm: Function; 
// }
export default function EditAddress(props) {
  const { open, onClose, order, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }

  const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
  });

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
          id="line1"
          defaultValue={order?.shipping_address?.line1}
          placeholder=""
        />
      </div>
      <div className="mt-2 ">
        <span>Address Line 2</span>
        <input
          className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
          type="text"
          id="line2"
          defaultValue={order?.shipping_address?.line2}
          placeholder=""
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
            />
          </div>
          <div className="mt-2 ">
            <span>Postal Code</span>
            <input
              className="w-full mt-2 rounded-md text-N700 bg-opacity-20 bg-N200"
              type="text"
              id="postal_code"
              defaultValue={order?.shipping_address?.postal_code}
              placeholder=""
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
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={() => onClose()}
          className="text-xs text-N600 bg-N0">CANCEL</Button>
        <Button
          onClick={() => onClose()}
          className="text-xs text-N0 bg-secondary hover:bg-secondary-light">APPLY</Button>
      </div>
    </Dialog>
  );
}