export const parseAddress = (order) => {
  const txtAddr = `${order.person_name}, ${order.shipping_address.line1}, 
  ${order.shipping_address.line2} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.country}`

  return txtAddr
}

