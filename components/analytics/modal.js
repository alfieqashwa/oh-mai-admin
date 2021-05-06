import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import { AddCategoryContent } from './categoryModalContent'
import { GlassDiv } from 'components/glassdiv'

export function AddCategoryModal({ isOpen, setIsOpen }) {

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
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
                <GlassDiv className="flex flex-col h-full py-6 overflow-y-scroll rounded-none shadow-xl ">
                  <div className="flex items-center justify-between px-4 sm:px-6">
                    <Dialog.Title className="text-2xl font-medium text-N0">Add Category</Dialog.Title>
                    <button
                      className="text-gray-300 transition duration-200 ease-in-out bg-transparent rounded-md text-N0 hover:text-N300 focus:outline-none focus:ring-2 focus:ring-N0"
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
                      <AddCategoryContent />
                    </div>

                    {/* /End replace */}

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
