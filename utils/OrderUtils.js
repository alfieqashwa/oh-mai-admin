import { DateTime } from "luxon"

export const parseAddress = (order) => {
  const txtAddr = `${order.person_name}, ${order.shipping_address.line1}, 
  ${order.shipping_address.line2} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.country}`

  return txtAddr
}

// from mysql table
export const toReadableDate = (date) => {
  if (!date) {
    return 
  }
  
  console.log("toReadableDate:date", date)
  const jsDate = new Date(date)

  console.log("toReadableDate:jsDate", jsDate)
  console.log("toReadableDate:jsDate typeof", typeof jsDate)

  const lxDate = DateTime.fromJSDate(jsDate)
  return lxDate.toFormat("dd MMM yyyy")
}

export const toReadableDateTime = (date) => {
  if (!date) {
    return 
  }
  
  console.log("toReadableDate:date", date)
  const jsDate = new Date(date)

  console.log("toReadableDate:jsDate", jsDate)
  console.log("toReadableDate:jsDate typeof", typeof jsDate)

  const lxDate = DateTime.fromJSDate(jsDate)
  return lxDate.toFormat("dd MMM yyyy HH:mm")
}