import { gql } from 'graphql-request'

// new schema # http://localhost:3004/analytics/customer

export const GET_ANALYTIC_CUSTOMER_TABLE = gql`
  query GetAnalyticCustomerTable($startDate: String, $endDate: String, $timeMode: String) {
    getAnalyticCustomerTable(startDate: $startDate, endDate: $endDate, timeMode: $timeMode) {
      sn
      customer_id
      customer_name
      most_recent_order
      orders
      item_sold
      net_sales
    }
  }
`

export const GET_ORDER_CUSTOMER_YEARLY = gql`
  query getOrderCustomerYearly($timeMode: String, $startDate: String, $endDate: String, $customerId: String){
    getOrderCustomerYearly(timeMode: $timeMode, startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
      type
    }
  }
`

export const GET_NET_SALES_CUSTOMER_YEARLY = gql`
  query getTotalNetSalesCustomerYearly($timeMode: String, $startDate: String, $endDate: String, $customerId: String){
    getTotalNetSalesCustomerYearly(timeMode: $timeMode, startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year
      type    
    }
  }
`

export const GET_TOTAL_ITEM_BOUGHT_CUSTOMER_YEARLY = gql`
  query getTotalItemBoughtCustomerYearly($timeMode: String, $startDate: String, $endDate: String, $customerId: String){
    getTotalItemBoughtCustomerYearly(timeMode: $timeMode, startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
      type
    }
  }
`

export const GET_SUCCESS_ORDER_CUSTOMER_YEARLY = gql`
  query getSuccessOrderCustomerYearly($timeMode: String, $startDate: String, $endDate: String, $customerId: String){
    getSuccessOrderCustomerYearly(timeMode: $timeMode, startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
      type
    }
  }
`

export const GET_ORDER_CUSTOMER_KOL_YEARLY = gql`
  query getOrderCustomerWithKolYearly($timeMode: String, $startDate: String, $endDate: String, $customerId: String){
    getOrderCustomerWithKolYearly(timeMode: $timeMode, startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
    }
  }
`

export const GET_ORDER_CUSTOMER_WITHOUT_KOL_YEARLY = gql`
  query getOrderCustomerWithoutKolYearly($timeMode: String, $startDate: String, $endDate: String, $customerId: String){
    getOrderCustomerWithoutKolYearly(timeMode: $timeMode, startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
    }
  }
`
