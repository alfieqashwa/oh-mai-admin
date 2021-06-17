import { gql } from "graphql-request";

export const GET_LIST_ORDER_GQL = gql`
  query listOrder($filter: OrdersFilter, $paging: Paging){
  listOrder(filter: $filter, paging: $paging){
    order_number
    consumer{
      id
      user{
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
    phone_num
    email
  }
}
`

export const DELETE_ORDER_GQL = gql`
  mutation deleteOrder($order_number: String){
    deleteOrder(order_number: $order_number){
      order_id
    }
  }
`

export const GET_ORDER_BY_ORDNUM = gql`
  query getOrderByOrderNumAdm($order_number: String) {
    getOrderByOrderNumAdm(order_number: $order_number){
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
          price
          quantity
          tax
          product{
            id
            sku
            main_product{
              product_name
            }
          }

          kol{
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
    order_id: $order_id, 
    order_datetime: $order_datetime, 
    shipping_tracking_number: $shipping_tracking_number, 
    order_status_shipping: $order_status_shipping, 
    order_status_payment: $order_status_payment, 
    shipping_cost: $shipping_cost, 
    order_delivery_date: $order_delivery_date, 
    shipping_line_1: $shipping_line_1, 
    shipping_line_2: $shipping_line_2, 
    city: $city, 
    state: $state, 
    country: $country, 
    postcode: $postcode, 
    phone_num: $phone_num, 
    person_name: $person_name, 
    payment_gateway: $payment_gateway
  )
}
`
