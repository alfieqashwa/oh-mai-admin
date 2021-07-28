import { gql } from 'graphql-request'

// new schema # http://localhost:3004/analytics/customer

export const GET_ANALYTIC_CUSTOMER_TABLE = gql`
  query GetAnalyticCustomerTable($startDate: String, $endDate: String) {
    getAnalyticCustomerTable(startDate: $startDate, endDate: $endDate) {
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
  query getOrderCustomerYearly($startDate: String, $endDate: String, $customerId: String){
    getOrderCustomerYearly(startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
      type
    }
  }
`

export const GET_NET_SALES_CUSTOMER_YEARLY = gql`
  query getTotalNetSalesCustomerYearly($startDate: String, $endDate: String, $customerId: String){
    getTotalNetSalesCustomerYearly(startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year
      type    
    }
  }
`

export const GET_TOTAL_ITEM_BOUGHT_CUSTOMER_YEARLY = gql`
  query getTotalItemBoughtCustomerYearly($startDate: String, $endDate: String, $customerId: String){
    getTotalItemBoughtCustomerYearly(startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
      type
    }
  }
`

export const GET_SUCCESS_ORDER_CUSTOMER_YEARLY = gql`
  query getSuccessOrderCustomerYearly($startDate: String, $endDate: String, $customerId: String){
    getSuccessOrderCustomerYearly(startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
      type
    }
  }
`

export const GET_ORDER_CUSTOMER_KOL_YEARLY = gql`
  query getOrderCustomerWithKolYearly($startDate: String, $endDate: String, $customerId: String){
    getOrderCustomerWithKolYearly(startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
    }
  }
`

export const GET_ORDER_CUSTOMER_WITHOUT_KOL_YEARLY = gql`
  query getOrderCustomerWithoutKolYearly($startDate: String, $endDate: String, $customerId: String){
    getOrderCustomerWithoutKolYearly(startDate: $startDate, endDate: $endDate, customerId: $customerId) {
      title
      performance
      precentage_change
      performance_last_year    
    }
  }
`
