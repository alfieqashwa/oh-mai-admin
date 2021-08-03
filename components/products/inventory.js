import React from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'

export function ProductListTable({ data }) {
  return (
    <table className="md:min-w-full">
      <thead>
        <tr>
          <th
            scope="col"
            className="hidden py-3 pr-4 text-left md:table-cell text-N0"
          >
            {/* checkbox */}
            <input
              type="checkbox"
              className="w-5 h-5 ml-1 rounded bg-opacity-20 bg-N200 focus:ring-P700 focus:outline-none checked:text-P700"
            />
          </th>
          <th
            scope="col"
            className="hidden px-4 py-3 font-normal text-left sr-only md:table-cell text-N0"
          >
            Image
          </th>
          <th
            scope="col"
            className="px-4 py-3 font-normal text-left text-N0"
          >
            Product
          </th>
          <th
            scope="col"
            className="px-4 py-3 font-normal text-left md:hidden text-N0"
          >
          </th>
          <th
            scope="col"
            className="px-4 py-3 font-normal text-left text-N0"
          >
            Status
          </th>
          <th
            scope="col"
            className="hidden px-4 py-3 font-normal text-left text-N0 md:table-cell"
          >
            SKU
          </th>
          <th
            scope="col"
            className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
          >
            Price
          </th>
          <th
            scope="col"
            className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
          >
            Sale Price
          </th>
          <th
            scope="col"
            className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
          >
            Category
          </th>
          <th
            scope="col"
            className="hidden px-4 py-3 font-normal text-left md:table-cell text-N0"
          >
            Quantity
          </th>
          <th scope="col" className="relative hidden py-3 md:table-cell">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="">
        {data.map((p, i) => (
          <tr key={i}>
            <td className="hidden py-4 pr-4 whitespace-nowrap md:table-cell">
              <input
                type="checkbox"
                className="w-5 h-5 ml-1 rounded bg-opacity-20 bg-N200 focus:outline-none focus:ring-P700 checked:text-P700"
              />
            </td>
            <td className="p-4 whitespace-nowrap">
              <div className="flex-shrink-0 w-10 h-10">
                <img className="w-10 h-10 border rounded border-N0 object-cover" src={p.images[0]} alt="" />
              </div>
            </td>
            <td className="p-4 whitespace-nowrap">
              <div className="text-sm text-N0">{p.main_product.product_name}</div>
            </td>
            <td className="p-4 whitespace-nowrap">
              <div className={'text-sm ' + (p.active_status ? 'text-G400' : 'text-R600')}>{p.active_status ? 'Actice' : 'Not active'}</div>
            </td>
            <td className="hidden p-4 md:table-cell whitespace-nowrap">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-N0">
                {p.sku}
              </span>
            </td>
            <td className="hidden p-4 text-sm md:table-cell text-N0 whitespace-nowrap">{p.base_price}</td>
            <td className="hidden p-4 text-sm md:table-cell text-N0 whitespace-nowrap">{p.sale_price}</td>
            <td className="hidden p-4 text-sm md:table-cell text-N0 whitespace-nowrap">{p.categories.join(', ')}</td>
            <td className="hidden p-4 text-sm md:table-cell text-N0 whitespace-nowrap">{p.stock_quantity}</td>
            <td className="py-4 pr-4">
              <a href="#" className="transition duration-200 ease-in-out text-N0 hover:text-opacity-75">
                <HiOutlinePencilAlt className="w-6 h-6" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
