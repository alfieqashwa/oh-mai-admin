import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon
} from '@heroicons/react/outline'

// dummy pagination
export const PaginationKol = () => {
	return (
		<div className="block mt-7 md:items-center md:justify-center md:flex">
			<nav className="flex items-center justify-center space-x-6 text-N0">
				<ChevronDoubleLeftIcon className="w-5 h-5 transition duration-300 ease-in-out cursor-pointer hover:text-P700" />
				<ChevronLeftIcon className="w-5 h-5 transition duration-300 ease-in-out cursor-pointer hover:text-P700" />
				<button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-300 ease-in-out">1</button>
				<button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-300 ease-in-out">2</button>
				<button className="px-2.5 text-sm border font-medium bg-N800 hover:bg-P700 transition duration-300 ease-in-out">3</button>
				<a className="px-2.5 py-1 text-sm border font-medium rounded bg-N800 hover:bg-P700 transition duration-300 ease-in-out">...</a>
				<button className="px-2 text-sm font-medium transition duration-300 ease-in-out border bg-N800 hover:bg-P700">99</button>
				<ChevronRightIcon className="w-5 h-5 transition duration-300 ease-in-out cursor-pointer hover:text-P700" />
				<ChevronDoubleRightIcon className="w-5 h-5 transition duration-300 ease-in-out cursor-pointer hover:text-P700" />
			</nav>
		</div >
	)
}