import { client, getClient } from 'lib/graphqlclient';
import { DELETE_ORDER_GQL, DELETE_ORDER_ITEM_GQL, GET_LIST_ORDER_GQL, GET_ORDER_BY_ORDNUM, UPDATE_ORDER_GQL, UPDATE_ORDER_ITEM_QTY } from 'graphql/order'
import { checkErrorAuth } from 'utils/Auth';

export const loadOrders = async (vars) => {
  let totalRow = 0

  try {
    const data = await getClient().request(GET_LIST_ORDER_GQL, vars)
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
    checkErrorAuth(error)
    return {
      data: [],
      totalRow
    }
  }
}

export const deleteOrders = async ({ order_number }) => {
  try {
    await getClient().request(DELETE_ORDER_GQL, {
      order_number: order_number
    })

    return {
      strResult: "Order has been deleted",
      isSuccess: true
    }
  } catch (error) {
    console.log("Delete order error", error)
    return {
      strResult: "Failed to delete",
      isSuccess: false
    }
  }
}

export const getOrderDetails = async ({ order_number }) => {
  try {
    const data = await getClient().request(GET_ORDER_BY_ORDNUM, {
      order_number: order_number
    })

    return {
      order: data.getOrderByOrderNumAdm,
      isSuccess: true
    }
  } catch (error) {
    console.log("Get order error", error)
    checkErrorAuth(error)
    return {
      order: null,
      isSuccess: false
    }
  }
}

export const updateOrder = async (order) => {
  try {
    const data = await getClient().request(UPDATE_ORDER_GQL, order)

    return {
      isSuccess: data.updateOrder
    }
  } catch (error) {
    console.log("Update order error", error)
    checkErrorAuth(error)
    return {
      isSuccess: false,
      error: error
    }
  }
}

export const updateOrderItem = async (oi) => {
  try {
    await getClient().request(UPDATE_ORDER_ITEM_QTY, oi)

    return {
      strResult: "Order item has been updated",
      isSuccess: true
    }
  } catch (error) {
    checkErrorAuth(error)
    console.log("Update order item error", error)
    return {
      strResult: "Failed to update order item",
      isSuccess: false
    }
  }
}


export const deleteOrderItem = async (id) => {
  try {
    await getClient().request(DELETE_ORDER_ITEM_GQL, { order_item_id: id })
    return {
      strResult: "Order item has been deleted",
      isSuccess: true
    }
  } catch (error) {
    checkErrorAuth(error)
    console.log("Delete order item error", error)
    return {
      strResult: "Failed to delete order item",
      isSuccess: false
    }
  }
}