import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'

const products = [
  {
    product: 'Monster Hunter: Rise',
    status: 'Active',
    sku: 'ASD12938012',
    price: '10.00',
    salePrice: '10.00',
    category: 'Games',
    quantity: '1290',
    image:
      '/monster_hunter_rise_cover.jpg',
  },
  {
    product: 'Monster Hunter: Rise',
    status: 'Active',
    sku: 'ASD12938012',
    price: '10.00',
    salePrice: '10.00',
    category: 'Games',
    quantity: '1290',
    image:
      '/monster_hunter_rise_cover.jpg',
  },
  {
    product: 'Monster Hunter: Rise',
    status: 'Active',
    sku: 'ASD12938012',
    price: '10.00',
    salePrice: '10.00',
    category: 'Games',
    quantity: '1290',
    image:
      '/monster_hunter_rise_cover.jpg',
  },
  {
    product: 'Monster Hunter: Rise',
    status: 'Active',
    sku: 'ASD12938012',
    price: '10.00',
    salePrice: '10.00',
    category: 'Games',
    quantity: '1290',
    image:
      '/monster_hunter_rise_cover.jpg',
  },
  {
    product: 'Monster Hunter: Rise',
    status: 'Active',
    sku: 'ASD12938012',
    price: '10.00',
    salePrice: '10.00',
    category: 'Games',
    quantity: '1290',
    image:
      '/monster_hunter_rise_cover.jpg',
  },
]

export function ProductListTable() {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3 pr-4 text-left text-N0"
                  >
                    {/* checkbox */}
                    <input
                      type="checkbox"
                      className="w-5 h-5 ml-1 rounded bg-opacity-20 bg-N200 focus:ring-P700 focus:outline-none checked:text-P700"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-normal text-left text-N0"
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
                    className="px-4 py-3 font-normal text-left text-N0"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-normal text-left text-N0"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-normal text-left text-N0"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-normal text-left text-N0"
                  >
                    Sale Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-normal text-left text-N0"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-normal text-left text-N0"
                  >
                    Quantity
                  </th>
                  <th scope="col" className="relative py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {products.map((p, i) => (
                  <tr key={i}>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="w-5 h-5 ml-1 rounded bg-opacity-20 bg-N200 focus:outline-none focus:ring-P700 checked:text-P700"
                      />
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-10 h-10 border rounded border-N0" src={p.image} alt="" />
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm text-N0">{p.product}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm text-G400">{p.status}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-N0">
                        {p.sku}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-N0 whitespace-nowrap">{p.price}</td>
                    <td className="p-4 text-sm text-N0 whitespace-nowrap">{p.salePrice}</td>
                    <td className="p-4 text-sm text-N0 whitespace-nowrap">{p.category}</td>
                    <td className="p-4 text-sm text-N0 whitespace-nowrap">{p.quantity}</td>
                    <td className="py-4 pr-4">
                      <a href="#" className="transition duration-200 ease-in-out text-N0 hover:text-opacity-75">
                        <HiOutlinePencilAlt className="w-6 h-6" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Pagination = props =>
  <div className="flex items-center justify-end pt-4 pb-8">

    <nav className="flex items-center space-x-6 text-N0">
      <ChevronDoubleLeftIcon className="w-5 h-5" />
      <ChevronLeftIcon className="w-5 h-5" />
      <button className="px-2.5 text-sm font-medium bg-P700 hover:bg-P700 transition duration-200 ease-in-out">1</button>
      <button className="px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">2</button>
      <button className="px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">3</button>
      <a className="px-2.5 py-1 text-sm font-medium rounded bg-N800 hover:bg-P700">...</a>
      <button className="px-2 text-sm font-medium bg-N800 hover:bg-P700">12</button>
      <ChevronRightIcon className="w-5 h-5" />
      <ChevronDoubleRightIcon className="w-5 h-5" />
    </nav>

    <div className="ml-6 mr-20">
      <p className="w350 text-N300">Showing <span className="font-medium text-N0">1</span> to <span className="font-medium text-N0">5</span> of <span className="font-medium text-N0">60</span> products</p>
    </div>

    <div className="flex items-center">
      <p className="w350 text-N200">Show</p>
      <select type="number" name="show" className="w-16 px-2 py-1 mx-2 rounded-md bg-N100">
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
        <option>60</option>
      </select>
      <p className="w350 text-N200">at a time</p>
    </div>
  </div>