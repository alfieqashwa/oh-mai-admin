import React, { Fragment } from 'react'
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

export const ArrowDirections = ({ item, checked }) => {
  if (item.precentage_change > 0) {
    return (<ArrowUpRight item={item} checked={checked} />)
  } else if (item.precentage_change < 0) {
    return (<ArrowDownRight item={item} checked={checked} />)
  } else {
    return (<ArrowRight item={item} checked={checked} />)
  }
}

export const ArrowRight = ({ item, checked }) => {
  return (
    <>
      <FiArrowRight className={`w-5 h-5 ${checked ? 'text-N800' : 'text-N0'}`} />
      <h5 className={`w250 ${checked ? 'text-N800' : 'text-N0'}`}>{item.precentage_change}</h5>
    </>
  )
}

export const ArrowDownRight = ({ item }) => {
  return (
    <>
      <FiArrowDownRight className="w-5 h-5 text-R600" />
      <h5 className="w250 text-R600">
        {item.precentage_change}%
      </h5>
    </>
  )
}

export const ArrowUpRight = ({ item }) => {
  return (
    <>
      <FiArrowUpRight className="w-5 h-5 text-G400" />
      <h5 className="w250 text-G400">
        {item.precentage_change}%
      </h5>
    </>
  )
}
