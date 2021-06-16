import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'

import { Header } from 'components/header'
import { GlassHeader } from 'components/glassHeader'
import { TitleWithBackButton } from 'components/titleWithBackButton'
import { Pagination } from 'components/analytics/kol'

export default function MostItemsSoldFromKol() {
	return (
		<div className="pr-12 pl-7">

			{/* Header? */}
			<Header title="KOL - most items sold from KOL" />
			<GlassHeader title="most items sold from KOL">
				<div className="flex space-x-4">
					<button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
				</div>
			</GlassHeader>

			{/* Title */}
			<TitleWithBackButton path="/analytics/kol" title="most items sold from KOL" />

			{/* Leaderboard Border */}
			<div className="flex items-center mt-5 space-x-5">
				<h4 className="capitalize w600">leaderboard</h4>
				<div className="w-full border border-N0 border-opacity-30"></div>
			</div>

			{/* Table */}
			<div className="mt-8">
				<header className="flex items-center justify-between px-6 py-4 rounded-t bg-N200">
					<h2 className="w250 text-N900">sort by</h2>
					<div className="px-4">
						<select name="date-range" className="px-10 bg-transparent border-transparent rounded w400 focus:ring-1 focus:ring-N700 focus:outline-none">
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
									<Menu.Button className={`bg-transparent focus:outline-none ${open ? "text-P400" : ""}`}>
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
                  ${!open ? "motion-safe:animate-bounce transition duration-700 ease-in-out" : ""}
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
							<th scope="col" className="px-2 py-4 text-center capitalize w400 whitespace-nowrap">#</th>
							<th scope="col" className="py-4 pl-4 text-left capitalize w400 whitespace-nowrap">KOL</th>
							<th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">orders</th>
							<th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">Items Sold</th>
							<th scope="col" className="py-4 text-right capitalize w400 whitespace-nowrap">total commissions</th>
							<th scope="col" className="p-4 text-center capitalize w400 whitespace-nowrap">net sales</th>
						</tr>
					</thead>

					{/* Table Content */}
					<tbody className="bg-N700 text-N0">
						{tableBody.map(t => (
							<tr key={t.id}>
								<td className="py-8 text-center bg-N600 w400 whitespace-nowrap">{t.sn}</td>
								<td className="py-8 pl-4 text-left underline capitalize w400">{t.kol}</td>
								<td className="py-8 text-right w400 whitespace-nowrap">{t.orders}</td>
								<td className="py-8 text-right w400 whitespace-nowrap">{t.itemsSold}</td>
								<td className="py-8 text-right w400 whitespace-nowrap">${t.totalCommissions.toFixed(2)}</td>
								<td className="py-8 text-center w400">{t.netSales.toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<Pagination />
		</div>
	)
}

// Best Selling Product List Dummy Data
const tableBody = [
	{ id: 1, sn: '1', kol: 'charlene yue', orders: 23, itemsSold: 90, totalCommissions: 120, netSales: 27800.90 },
	{ id: 2, sn: '2', kol: 'lice wang', orders: 12, itemsSold: 67, totalCommissions: 40, netSales: 17800.90 },
	{ id: 3, sn: '3', kol: 'NWBigBoss', orders: 4, itemsSold: 35, totalCommissions: 30, netSales: 13200.90 },
	{ id: 4, sn: '4', kol: 'sky game', orders: 12, itemsSold: 15, totalCommissions: 0.05, netSales: 8900.90 },
	{ id: 5, sn: '5', kol: "ru's piano", orders: 3, itemsSold: 15, totalCommissions: 0.05, netSales: 2100.90 },
]