import { gql } from 'graphql-request'

export const GET_LIST_ORDER_GQL = gql`
  query listOrder($filter: OrdersFilter, $paging: Paging) {
    listOrder(filter: $filter, paging: $paging) {
      order_number
      consumer {
        id
        user {
          first_name
          last_name
        }
      }
      order_datetime
      order_status_payment
      shipping_address {
        line1
        line2
        city
        state
        country
        phone_num
        person_name
      }
      payment_type
      total_price
      payment_date
      payment_type_charge_fee
      total_count
      person_name
      email
    }
  }
`

export const DELETE_ORDER_GQL = gql`
  mutation deleteOrder($order_number: String) {
    deleteOrder(order_number: $order_number) {
      order_id
    }
  }
`

export const GET_ORDER_BY_ORDNUM = gql`
  query getOrderByOrderNumAdm($order_number: String) {
    getOrderByOrderNumAdm(order_number: $order_number) {
      order_id
      order_datetime
      order_number
      payment_gateway
      payment_date
      payment_type
      payment_type_charge_fee
      total_price
      charge_id
      order_status_shipping
      order_status_payment
      consumer {
        id
        user {
          first_name
          last_name
        }
      }
      shipping_tracking_number
      order_delivery_date
      shipping_cost
      shipping_address {
        line1
        line2
        city
        state
        country
        postal_code
        phone_num
        person_name
      }
      total_count
      invoice_num
      invoice_random_num
      invoice_date
      person_name
      email
      shipping_company
      order_item {
        order_item_id
        order_item_name
        order_item_kol_profit_earning
        price
        quantity
        tax
        product {
          id
          sku
          main_product {
            product_name
          }
        }

        kol {
          id
          display_name
        }
      }
    }
  }
`

export const UPDATE_ORDER_GQL = gql`
  mutation updateOrder(
    $order_id: Int
    $order_datetime: String
    $shipping_tracking_number: String
    $order_status_shipping: String
    $order_status_payment: String
    $shipping_cost: Float
    $order_delivery_date: String
    $shipping_line_1: String
    $shipping_line_2: String
    $city: String
    $state: String
    $country: String
    $postcode: Int
    $phone_num: String
    $person_name: String
    $payment_gateway: String
  ) {
    updateOrder(
      order_id: $order_id
      order_datetime: $order_datetime
      shipping_tracking_number: $shipping_tracking_number
      order_status_shipping: $order_status_shipping
      order_status_payment: $order_status_payment
      shipping_cost: $shipping_cost
      order_delivery_date: $order_delivery_date
      shipping_line_1: $shipping_line_1
      shipping_line_2: $shipping_line_2
      city: $city
      state: $state
      country: $country
      postcode: $postcode
      phone_num: $phone_num
      person_name: $person_name
      payment_gateway: $payment_gateway
    )
  }
`

export const UPDATE_ORDER_ITEM_QTY = gql`
  mutation updateOrderItemQty($order_item_id: Int, $quantity: Int) {
    updateOrderItemQty(order_item_id: $order_item_id, quantity: $quantity)
  }
`

export const DELETE_ORDER_ITEM_GQL = gql`
  mutation deleteOrderItem($order_item_id: Int) {
    deleteOrderItem(order_item_id: $order_item_id)
  }
`

// new schema
export const GET_LEADERBOARD_PRODUCT = gql`
  query GetLeaderBoardProduct {
    getLeaderBoardProduct {
      title
      total_order
      total_net_sales
    }
  }
`
export const GET_LEADERBOARD_KOL = gql`
  query GetLeaderBordKol {
    getLeaderBoardKol {
      title
      total_order
      total_net_sales
    }
  }
`
export const GET_LEADERBOARD_CUSTOMER = gql`
  query GetLeaderBoardCustomer {
    getLeaderBoardCustomer {
      title
      total_order
      total_net_sales
    }
  }
`

export const GET_LIST_TOP_SALES_PRODUCT = gql`
  query getListTopSalesProduct($startDate: String, $endDate: String) {
    getListTopSalesProduct(startDate: $startDate, endDate: $endDate) {
      sn
      product_title
      sku
      item_sold
      net_sales
      order
      category
    }
  }
`
export const GET_LIST_TOP_SALES_ON_KOL = gql`
  query getListTopSalesOnKol($startDate: String, $endDate: String) {
    getListTopSalesOnKol(startDate: $startDate, endDate: $endDate) {
      kol_id
      sn
      kol_name
      item_sold
      net_sales
      orders
      total_commission
    }
  }
`

export const GET_LIST_TOP_SALES_ON_CUSTOMER = gql`
  query getListTopSalesOnCustomer($startDate: String, $endDate: String) {
    getListTopSalesOnCustomer(startDate: $startDate, endDate: $endDate) {
      customer_id
      customer_name
      order
      avarege_order_value
      total_item_bought
      gross_sales
      net_sales
    }
  }
`

export const GET_SUMMARY_PERFORMANCE = gql`
  query getSumaryPerformance($startDate: String, $endDate: String) {
    getSumaryPerformance(startDate: $startDate, endDate: $endDate) {
      title
      performance
      precentage_change
      performance_last_year
    }
  }
`

export const GET_ORDER_SUMMARY_TABLE = gql`
  query getOrderSumaryTable($startDate: String, $endDate: String) {
    getOrderSumaryTable(startDate: $startDate, endDate: $endDate) {
      order_datetime
      total_order
      net_sales
      order_item_tax
      shipping_cost
    }
  }
`

export const GET_ORDER_SUMMARY_CHART = gql`
  query getOrderSumaryChart($startDate: String, $endDate: String) {
    getOrderSumaryChart(startDate: $startDate, endDate: $endDate) {
      order_datetime
      net_sales
    }
  }
`

export const GET_ORDER_PERFORMANCE = gql`
  query getOrderPerformance($startDate: String, $endDate: String) {
    getOrderPerformance(startDate: $startDate, endDate: $endDate) {
      title
      performance
      precentage_change
      performance_last_year
    }
  }
`

export const GET_ORDER_LIST_SUMMARY_TABLE = gql`
  query getOrderListSumaryTable($startDate: String, $endDate: String) {
    getOrderListSumaryTable(startDate: $startDate, endDate: $endDate) {
      order_datetime
      net_sales
      order_number
      consumer_id
      person_name
      shipping_line_1
      shipping_line_2
      phone_num
      city
      state
      payment_type
    }
  }
`
