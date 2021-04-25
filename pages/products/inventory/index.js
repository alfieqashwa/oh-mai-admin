import { Menu, Transition } from '@headlessui/react'
import { BiTrash } from 'react-icons/bi'
import { MdAddCircleOutline } from 'react-icons/md'
import { FiFilter } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { GlassDefault } from 'components/glassDefault'
import { Header } from 'components/header'
import { Pagination, ProductListTable, InventoryMobileView } from 'components/products/inventory'

export default function Inventory() {
  return (
    <>
      <Header title="Inventory" />

      {/* Starts ROOT */}
      <div className="mx-4 md:mt-8 md:ml-6 md:mr-16 md:block">

        {/* Start Inventory, Export, ADD PRODUCT Desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="space-x-0">
              <h3>Inventory</h3>
            </div>

            <div className="space-x-8">
              <button className="text-sm bg-transparent text-N0">export</button>
              <button className="px-6 py-2 text-sm uppercase shadow-2xl bg-G400 text-N0">add product</button>
            </div>
          </div>
        </div>
        {/* Ends of Inventory, Export, ADD PRODUCT Desktop */}

        {/* Start Inventory, Export, ADD PRODUCT Mobile */}
        <div className="md:hidden">
          <GlassDefault className="p-4 -mx-4 border rounded-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AiOutlineArrowLeft className="w-6 h-6 md:hidden text-N0" />
                <h5>Inventory</h5>
              </div>
              <div className="flex flex-row space-x-4">
                <button className="text-sm bg-transparent text-N0">export</button>
                <button className="px-6 py-2 text-sm uppercase shadow-2xl bg-G400 text-N0">add product</button>
              </div>
            </div>
          </GlassDefault>
        </div>
        {/* Ends of Inventory, Export, ADD PRODUCT Mobile */}

        {/* Start first row Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mt-4">
            <h3>Inventory</h3>
            <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
              <FiFilter className="w-5 h-5" />
              <p className="text-xs text-N800">filter</p>
            </button>
          </div>
        </div>
        {/* Ends first row Mobile */}

        {/* Start Tabel (GlassDiv) */}
        <GlassDefault className="p-4 mt-4 border-2 rounded-none">
          <div className="flex flex-col">
            <div className="-my-2 md:overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg">

                  {/* Starts first row Desktop */}
                  <div className="items-center justify-start hidden space-x-2 md:flex">
                    <p className="mr-2 text-sm capitalize">view products</p>
                    <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N0 bg-P700">all</button>
                    <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N800 bg-N100">active</button>
                    <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N800 bg-N100">draft</button>
                    <button className="px-6 py-2 text-xs uppercase shadow-2xl text-N800 bg-N100">archived</button>
                  </div>
                  {/* Ends first row Desktop */}

                  {/* Starts second row: Desktop */}
                  <div className="items-center justify-between hidden mt-6 space-x-16 md:flex">
                    <div className="relative w-2/3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-6 h-6 text-N0 left-3 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        className="flex-auto w-full pl-10 text-sm placeholder-opacity-50 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N0"
                        type="text" name="search" placeholder="Search for a product" />
                    </div>

                    <div className="items-center hidden space-x-3 md:flex justify start">
                      <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
                        <BiTrash className="w-5 h-5" />
                        <p className="text-xs text-N800">delete</p>
                      </button>
                      <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
                        <MdAddCircleOutline className="w-5 h-5" />
                        <p className="text-xs text-N800 whitespace-nowrap">add category</p>
                      </button>
                      <button className="flex items-center justify-between px-4 py-2 space-x-2 uppercase shadow-2xl text-N800 bg-N100">
                        <FiFilter className="w-5 h-5" />
                        <p className="text-xs text-N800">filter</p>
                      </button>
                    </div>
                  </div>
                  {/* Ends of second row: Desktop */}

                  {/* Starts second row: Mobile */}
                  <div className="md:hidden">
                    <div className="flex items-center justify-between space-x-4">

                      <div className="w-1/2 py-4">
                        <select className="w-full rounded-md text-N0 bg-opacity-20 bg-N200">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                      <div className="relative w-1/2 py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-5 h-5 top-7 text-N0 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          className="w-full pl-10 placeholder-opacity-50 rounded-md text-N0 bg-opacity-20 bg-N200 placeholder-N0"
                          type="text" name="search" placeholder="Search for a product" />
                      </div>
                      <Menu as="div" className="relative">
                        {({ open }) => (
                          <>
                            <Menu.Button as="button" className="mr-1 bg-transparent text-N0 focus:outline-none focus:ring ring-P700">
                              <BsThreeDotsVertical className="w-8 h-8" />
                            </Menu.Button>
                            <Transition
                              show={open}
                              enter="transition duration-200 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Menu.Items as="ul" static className="absolute px-4 py-3 mt-2 space-y-4 border rounded-md shadow-lg focus:outline-none right-6 bg-N0">
                                <Menu.Item as="li" className="flex items-center justify-between space-x-6">
                                  <BiTrash className="w-7 h-7" />
                                  <p className="text-sm font-semibold uppercase text-N800">delete</p>
                                </Menu.Item>
                                <Menu.Item as="li" className="flex items-center justify-between space-x-6">
                                  <MdAddCircleOutline className="w-7 h-7" />
                                  <p className="text-sm font-semibold uppercase whitespace-nowrap text-N800">add category</p>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                  {/* Ends of second row: Mobile */}

                  {/* // PRODUCTS LIST*/}
                  <div className="mt-4">
                    <ProductListTable />
                  </div>
                </div>
              </div>
            </div>
          </div>


        </GlassDefault>
        {/* Ends Tabel (GlassDiv) */}

        {/* Pagination */}
        <Pagination />

      </div>
      {/* Ends ROOT */}
    </>
  )
}