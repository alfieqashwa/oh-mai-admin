import { getClient } from 'lib/graphqlclient'
import { checkErrorAuth } from 'utils/Auth'
import { GET_ORDER_CUSTOMER_YEARLY, GET_NET_SALES_CUSTOMER_YEARLY, GET_TOTAL_ITEM_BOUGHT_CUSTOMER_YEARLY, GET_SUCCESS_ORDER_CUSTOMER_YEARLY, GET_ORDER_CUSTOMER_KOL_YEARLY, GET_ORDER_CUSTOMER_WITHOUT_KOL_YEARLY, GET_ANALYTIC_CUSTOMER_TABLE } from 'graphql/customer'
import { mode } from 'tailwind.config'
import { timeFilterFormatter } from 'utils/Others'

export const loadPerformanceAnalyticCustomer = async ({ startDate, endDate, customerId }) => {
  console.log('loadPerformanceAnalyticCustomer')
  // console.log("startDate", startDate)
  // console.log("endDate", endDate)

  const client = getClient()
  const vars = {
    customerId: customerId,
    startDate: startDate || null,
    endDate: endDate || null
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

export const getAnalyticCustomerTable = async (filter) => {
  if (!filter) {
    return {
      data: [],
      isSuccess: false
    }
  }

  const client = getClient()

  // if (!filter) {
  //   try {
  //     const response = await client.request(GET_ANALYTIC_CUSTOMER_TABLE)
  //     return {
  //       data: response.getAnalyticCustomerTable,
  //       isSuccess: true
  //     }
  //   } catch (error) {
  //     console.log('Get customer table error', error)
  //     return {
  //       data: [],
  //       isSuccess: false
  //     }
  //   }
  // }

  const vars = {
    mode: filter.mode
  }

  const dateFilter = timeFilterFormatter(filter)

  if (dateFilter) {
    vars.startDate = dateFilter.startDate
    vars.endDate = dateFilter.endDate
  }

  console.log("lewat filter", filter)

  if ((filter.mode === 'days') || (filter.mode === 'weeks') || (filter.mode === 'months') || (filter.mode === 'years')) {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      console.log("lewat")
      return {
        data: [],
        isSuccess: false
      }
    }
  }

  try {
    const response = await client.request(GET_ANALYTIC_CUSTOMER_TABLE, vars)
    return {
      data: response.getAnalyticCustomerTable,
      isSuccess: true
    }
  } catch (error) {
    console.log('Get customer table error', error)
    return {
      data: [],
      isSuccess: false
    }
  }
}
