import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/outline'

import { GlassDiv } from "components/glassdiv";

export function FilterSidebar({ isOpen, setIsOpen }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-20 overflow-hidden"
        open={isOpen}
        onClose={setIsOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-xl">
                <GlassDiv className="flex flex-col h-full py-12 overflow-y-scroll rounded-none shadow-xl ">
                  <div className="flex items-center justify-between px-4 sm:px-6">
                    <Dialog.Title className="text-2xl font-medium text-N0">Filter</Dialog.Title>
                    <button
                      className="transition duration-200 ease-in-out bg-transparent rounded-md text-N0 hover:text-N300 focus:text-300 focus:outline-none focus:ring-2 focus:ring-N300"
                      onClick={() => setIsOpen(false)}
                    >
                      <XIcon className="w-8 h-8" aria-hidden="true" />
                      <span className="sr-only">Close panel</span>
                    </button>
                  </div>
                  <div className="relative flex-1 px-4 mt-4 sm:px-6">
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="h-full border border-N350" aria-hidden="true" />
                      {/* Replace with your content */}
                      <Content />
                    </div>
                  </div>
                </GlassDiv>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog >
    </Transition.Root >
  )
}

const Content = () => (
  <section className="mt-9">
    {filterContent.map(f => (
      <div key={f.id} className="flex items-center justify-between space-y-5">
        <h6 className="uppercase text-N0 font-secondary">{f.name}</h6>
        <ChevronRightIcon className="w-5 h-5 text-N0" />
      </div>
    ))}
    <footer className="mt-80">
      <button className="w-full shadow-md bg-P700">
        <p className="py-2 font-secondary text-N0">clear all</p>
      </button>
    </footer>
  </section>
)

const filterContent = [
  { id: 1, name: 'date & time' },
  { id: 2, name: 'status' },
  { id: 3, name: 'items sold' },
  { id: 4, name: 'net sales' },
]
