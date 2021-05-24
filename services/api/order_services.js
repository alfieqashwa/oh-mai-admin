import { client } from 'lib/graphqlclient';
import { DELETE_ORDER_GQL, GET_LIST_ORDER_GQL } from 'graphql/order'

export const loadOrders = async (vars) => {
  let totalRow = 0

  try {
    const data = await client.request(GET_LIST_ORDER_GQL, vars)
    console.log("Get list order done", data)
    const orders = data.listOrder

    if (orders.length > 0) {
      totalRow = orders[0].total_count
      console.log("Total", totalRow)
    }

    return {
      data: orders,
      totalRow
    }
  } catch (error) {
    console.log("Get list order error", error)
    return {
      data: [],
      totalRow
    }
  }
}

export const deleteOrders = async ({ order_number }) => {
  try {
    await client.request(DELETE_ORDER_GQL, {
      order_number: order_number
    })

    return "Order has been deleted"
  } catch (error) {
    console.log("Delete order error", error)
    return "Failed to delete"
  }
}