import { client } from 'lib/graphqlclient';
import { GET_LIST_ORDER_GQL } from 'graphql/order'

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