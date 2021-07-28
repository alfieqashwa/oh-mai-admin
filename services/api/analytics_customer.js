import { getClient } from 'lib/graphqlclient'
import { checkErrorAuth } from 'utils/Auth'
import { GET_ORDER_CUSTOMER_YEARLY, GET_NET_SALES_CUSTOMER_YEARLY, GET_TOTAL_ITEM_BOUGHT_CUSTOMER_YEARLY, GET_SUCCESS_ORDER_CUSTOMER_YEARLY, GET_ORDER_CUSTOMER_KOL_YEARLY, GET_ORDER_CUSTOMER_WITHOUT_KOL_YEARLY } from 'graphql/customer'

export const loadPerformanceAnalyticCustomer = async ({ startDate, endDate, customerId }) => {
  const client = getClient()
  const vars = {
    customerId: customerId,
    startDate: null,
    endDate: null
  }
  const listPerformance = []

  try {
    const orderCustomer = await client.request(GET_ORDER_CUSTOMER_YEARLY, vars)
    const dataOrderCustomer = orderCustomer.getOrderCustomerYearly

    const netSalesCustomer = await client.request(GET_NET_SALES_CUSTOMER_YEARLY, vars)
    const dataNetSalesCustomer = netSalesCustomer.getTotalNetSalesCustomerYearly

    const totlItemBoughtCustomer = await client.request(GET_TOTAL_ITEM_BOUGHT_CUSTOMER_YEARLY, vars)
    const dataTotlItemBoughtCustomer = totlItemBoughtCustomer.getTotalItemBoughtCustomerYearly

    const successOrderCustomer = await client.request(GET_SUCCESS_ORDER_CUSTOMER_YEARLY, vars)
    const dataSuccessOrderCustomer = successOrderCustomer.getSuccessOrderCustomerYearly

    const kolOrderCustomer = await client.request(GET_ORDER_CUSTOMER_KOL_YEARLY, vars)
    const dataKolOrderCustomer = kolOrderCustomer.getOrderCustomerWithKolYearly

    const withoutKolOrderCustomer = await client.request(GET_ORDER_CUSTOMER_WITHOUT_KOL_YEARLY, vars)
    const dataWithoutKolOrderCustomer = withoutKolOrderCustomer.getOrderCustomerWithoutKolYearly

    if (dataOrderCustomer) {
      listPerformance.push(dataOrderCustomer)
    }

    if (dataNetSalesCustomer) {
      listPerformance.push(dataNetSalesCustomer)
    }

    if (dataTotlItemBoughtCustomer) {
      listPerformance.push(dataTotlItemBoughtCustomer)
    }

    if (dataSuccessOrderCustomer) {
      listPerformance.push(dataSuccessOrderCustomer)
    }

    if (dataKolOrderCustomer) {
      listPerformance.push(dataKolOrderCustomer)
    }

    if (dataWithoutKolOrderCustomer) {
      listPerformance.push(dataWithoutKolOrderCustomer)
    }

    console.log('loadPerformanceAnalyticCustomer', orderCustomer)
    return {
      data: listPerformance,
      isSuccess: true
    }
  } catch (error) {
    checkErrorAuth(error)
    console.log('loadPerformanceAnalyticCustomer order item error', error)
    return {
      data: [],
      isSuccess: false
    }
  }
}
