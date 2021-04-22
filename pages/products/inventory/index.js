import { BiTrash } from 'react-icons/bi'
import { MdAddCircleOutline } from 'react-icons/md'
import { FiFilter } from 'react-icons/fi'

import { GlassDefault } from 'components/glassDefault'
import { Header } from 'components/header'
import { Pagination, ProductListTable } from 'components/products/inventory'

export default function Inventory() {
  return (
    <>
      <Header title="Inventory" />
      {/* ROOT */}
      <div className="mt-8 ml-6 mr-16">

        {/* Inventory, Export, ADD PRODUCT */}
        <div className="flex items-center justify-between">
          <h3>Inventory</h3>

          <div className="space-x-8">
            <button className="text-sm bg-transparent text-N0">export</button>
            <button className="px-6 py-2 text-sm uppercase shadow-2xl bg-G400 text-N0">add product</button>
          </div>
        </div>

        {/* Start Tabel (GlassDiv) */}
        <GlassDefault className="p-4 mt-4 border-2 rounded-none">

          {/* first row */}
          <div className="flex items-center justify-start space-x-2">
            <p className="mr-2 text-sm capitalize">view products</p>
            <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N0 bg-P700">all</button>
            <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N800 bg-N100">active</button>
            <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N800 bg-N100">draft</button>
            <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N800 bg-N100">archived</button>
          </div>

          {/* second row */}
          <div className="flex items-center justify-between mt-6 space-x-16">
            <input
              className="flex-auto text-sm placeholder-opacity-50 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N0"
              type="text" name="search" placeholder="Search for a product" />

            <div className="flex items-center space-x-3 justify start">
              <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
                <BiTrash className="w-5 h-5" />
                <p className="text-xs text-N800">delete</p>
              </button>
              <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
                <MdAddCircleOutline className="w-5 h-5" />
                <p className="text-xs text-N800">add category</p></button>
              <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
                <FiFilter className="w-5 h-5" />
                <p className="text-xs text-N800">filter</p></button>
            </div>
          </div>

          {/* // PRODUCTS LIST*/}
          <div className="mt-4">
            <ProductListTable />
          </div>

        </GlassDefault>
        {/* Ends Tabel (GlassDiv) */}

        {/* Pagination */}
        <Pagination />

      </div>
    </>
  )
}