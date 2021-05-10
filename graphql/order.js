import { gql } from "graphql-request";

export const GET_LIST_ORDER_GQL = gql`
  query {
  orders{
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
  }
}
`
