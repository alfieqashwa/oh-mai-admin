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
  query getOrderByOrderNum($order_number: String) {
    getOrderByOrderNum(order_number: $order_number){
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
    }
  }
`