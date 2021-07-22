import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { SwitchOnOff } from './switch-on-off'
import { moneyFormat } from 'utils/money-format'

export function TableOrders({ data, status, setStatus }) {
  return (
    <div className="mt-8">
      <header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
        <h2 className="w250 text-N900">sort by</h2>
        <div className="px-4">
          <select
            name="date-range"
            className="px-10 bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none"
          >
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
        <div className="relative flex-1 w-full px-4">
          <FiSearch className="absolute w-6 h-6 top-3 left-8 text-N700" />
          <input
            type="text"
            name="search"
            placeholder="Search for a title or SKU"
            className="w-full px-12 py-3 bg-transparent border rounded border-N900"
          />
        </div>
        <div>
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <Menu.Button
                  className={`bg-transparent focus:outline-none ${
                    open ? 'text-P400' : ''
                  }`}
                >
                  <BsThreeDotsVertical className="w-6 h-6" />
                </Menu.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-700"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className={`
                  ${
                    !open
                      ? 'motion-safe:animate-bounce transition duration-700 ease-in-out'
                      : ''
                  }
                  absolute z-20 rounded shadow-xl bg-N0 right-2 top-10 focus:outline-none
                  `}
                  >
                    <Menu.Item
                      as="button"
                      // onClick={() => setIsOpen(true)}
                      className="flex items-center justify-between w-full px-4 py-2 space-x-16 transition duration-300 ease-in-out hover:bg-N200 bg-N0 whitespace-nowrap focus:outline-none"
                    >
                      <FiDownloadCloud className="w-6 h-6" />
                      <h4 className="w250 text-N900">export</h4>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </header>

      {/* Table Header */}
      <table className="md:min-w-full text-N0">
        <thead className="bg-N200 bg-opacity-30">
          <tr>
            <th
              scope="col"
              className="p-4 text-center capitalize w400 whitespace-nowrap"
            >
              s/n
            </th>
            <th
              scope="col"
              className="p-4 text-left capitalize w400 whitespace-nowrap"
            >
              product title
            </th>
            <th
              scope="col"
              className="p-4 text-right capitalize w400 whitespace-nowrap"
            >
              SKU
            </th>
            <th
              scope="col"
              className="p-4 text-right capitalize w400 whitespace-nowrap"
            >
              Items Sold
            </th>
            <th
              scope="col"
              className="p-4 text-right capitalize w400 whitespace-nowrap"
            >
              net sales
            </th>
            <th
              scope="col"
              className="p-4 text-right capitalize w400 whitespace-nowrap"
            >
              orders
            </th>
            <th
              scope="col"
              className="p-4 text-right capitalize w400 whitespace-nowrap"
            >
              category
            </th>
            <th
              scope="col"
              className="p-4 text-center capitalize w400 whitespace-nowrap"
            >
              toggle chart
            </th>
          </tr>
        </thead>

        {/* Table Content */}
        <tbody className="bg-N700 text-N0">
          {data?.map((t, i) => (
            <tr key={i} className="">
              <td className="p-4 text-center bg-N600 w400 whitespace-nowrap">
                {t.sn}
              </td>
              <td className="p-4 text-left underline w400">
                {t.product_title}
              </td>
              <td className="p-4 text-right w400 whitespace-nowrap">{t.sku}</td>
              <td className="p-4 text-right w400 whitespace-nowrap">
                {t.item_sold}
              </td>
              <td className="p-4 text-right w400 whitespace-nowrap">
                {moneyFormat.format(t.net_sales)}
              </td>
              <td className="p-4 text-right underline w400">{t.order}</td>
              <td className="p-4 text-right w400">{t.category}</td>
              <td className="py-4 text-center x-4 w400 whitespace-nowrap">
                {/*  TODO: because this components is reusable, i leave it as it is for now until needed to avoid crashing in the other pages */}
                <SwitchOnOff isEnabled={status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
