import React, { Fragment } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { SiGoogleanalytics } from 'react-icons/si'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { moneyFormat } from 'utils/money-format'

export const LeaderboardCardType = ({
  path,
  cardName,
  title,
  totalOrder,
  totalNetSales,
  leaderboardQuery
}) => (
  <div className="relative px-5 bg-[#E0E0F24D] h-52 bg-opacity-30 border-[1px] border-opacity-60 border-[#A0A0AD99]">
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            className={`absolute bg-transparent top-4 right-3 focus:outline-none ${
              open ? 'text-P400' : 'text-N0'
            }`}
          >
            <BsThreeDotsVertical className="w-6 h-6" />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute shadow-xl top-16 right-4 focus:outline-none"
            >
              <Link href={path}>
                <a>
                  <Menu.Item
                    as="button"
                    className="flex items-center justify-between w-full px-4 py-2 transition duration-300 ease-in-out rounded focus:outline-none bg-N0 hover:bg-N300"
                  >
                    <SiGoogleanalytics className="w-6 h-6" />
                    <h4 className="pl-8 w250 text-N900 whitespace-nowrap">
                      view leaderboard
                    </h4>
                  </Menu.Item>
                </a>
              </Link>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>

    <h5 className="mt-5 text-opacity-50 w250 text-N0">{cardName}</h5>
    <h4 className="mt-3 w600 text-N0">{title}</h4>
    <div className="flex justify-start mt-3 space-x-3">
      <div className="w-40">
        <p className="text-opacity-50 w400 text-N0">Total Orders</p>
        <p className="w400 text-N0">{totalOrder}</p>
      </div>
      <div className="w-40">
        <p className="text-opacity-50 w400 text-N0">Net Sales</p>
        {leaderboardQuery && (
          <p className="w400 text-N0">{moneyFormat.format(totalNetSales)}</p>
        )}
      </div>
    </div>
  </div>
)
