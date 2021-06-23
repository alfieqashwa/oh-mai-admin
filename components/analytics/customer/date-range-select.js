import { Fragment } from 'react'
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";

export function DateRangeSelect({
	selectedCurrent, setSelectedCurrent,
	selectedPrevious, setSelectedPrevious
}) {
	return (
		<div className="flex items-center justify-between w-full mt-5 space-x-6">
			<div className="w-full">
				<p className="w400">Current Date Range</p>
				<Listbox value={selectedCurrent} onChange={setSelectedCurrent}>
					{({ open }) => (
						<>
							<div className="relative mt-1">
								<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default bg-N200 bg-opacity-20 text-N0 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-P900 focus:ring-offset-P900 focus-visible:ring-offset-2 focus:border-P900 sm:text-sm">
									<span className="block truncate">{selectedCurrent.name}</span>
									<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
										<ChevronDownIcon
											className="w-6 h-6 text-gray-400"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>
								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options
										static
										className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg text-N0 bg-N600 max-h-60 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
									>
										{dates.map((date, i) => (
											<Listbox.Option
												key={i}
												className={({ active }) =>
													`${active
														? "bg-P700"
														: ""
													}
										cursor-default select-none relative py-2 pl-10 pr-4`
												}
												value={date}
											>
												{({ selected, active }) => (
													<>
														<span
															className={`${selected ? "font-medium" : "font-normal"
																} block truncate`}
														>
															{date.name}
														</span>
														{selected ? (
															<span
																className={`${active ? "text-N0" : ""
																	}
													absolute inset-y-0 left-0 flex items-center pl-3`}
															>
																<CheckIcon
																	className="w-5 h-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
			</div>
			<div className="w-full">
				<p className="w400">Compare with Date Range</p>
				<Listbox value={selectedPrevious} onChange={setSelectedPrevious}>
					{({ open }) => (
						<>
							<div className="relative mt-1">
								<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default bg-N200 bg-opacity-20 text-N0 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-P900 focus:ring-offset-P900 focus-visible:ring-offset-2 focus:border-P900 sm:text-sm">
									<span className="block truncate">{selectedPrevious.name}</span>
									<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
										<ChevronDownIcon
											className="w-6 h-6 text-gray-400"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>
								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options
										static
										className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg text-N0 bg-N600 max-h-60 ring-1 ring-P900 ring-opacity-5 focus:outline-none sm:text-sm"
									>
										{dates.map((date, i) => (
											<Listbox.Option
												key={i}
												className={({ active }) =>
													`${active
														? "bg-P700"
														: ""
													}
										cursor-default select-none relative py-2 pl-10 pr-4`
												}
												value={date}
											>
												{({ selected, active }) => (
													<>
														<span
															className={`${selected ? "font-medium" : "font-normal"
																} block truncate`}
														>
															{date.name}
														</span>
														{selected ? (
															<span
																className={`${active ? "text-N0" : ""
																	}
													absolute inset-y-0 left-0 flex items-center pl-3`}
															>
																<CheckIcon
																	className="w-5 h-5 text-N0"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
			</div>
		</div>
	)
}

const dates = [
	{ name: "Current Year (Jan 1 - Dec 31, 2021)" },
	{ name: "Previous Year (Jan 1 - Dec 31, 2020)" }
]