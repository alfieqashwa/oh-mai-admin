export const BASE_URL = 'http://localhost:3002'
export const PAYMENT_STATUS = {
  pending: "pending",
  paid: "paid",
  processing: "processing",
  canceled: "canceled",
  failed: "failed"
}

export const SHIPPING_STATUS = {
  waiting_for_payment: "waiting_for_payment",
  on_process: "on_process",
  shipped: "shipped",
  delivered: "delivered",
  failed: "failed",
  returned: "returned"
}

export const PAYMENT_STATUS_ARR = [
  "pending",
  "paid",
  "processing",
  "canceled",
  "failed"
]


export const SHIPPING_STATUS_ARR = [
  "waiting_for_payment",
  "on_process",
  "shipped",
  "delivered",
  "failed",
  "returned"
]