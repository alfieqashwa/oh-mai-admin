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
