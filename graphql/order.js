import { gql } from "graphql-request";

export const GET_LIST_ORDER_GQL = gql`
  query listOrder($filter: OrdersFilter, $paging: Paging){
  listOrder(filter: $filter, paging: $paging){
    order_number
    consumer{
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
    }
    payment_type
    total_price
    payment_date
    payment_type_charge_fee
    total_count
    person_name
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