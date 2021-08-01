import { createStore } from 'redux'
import { loadOrders } from 'services/api/order_services'

const initialVal = {
  value: []
}

async function ordersReducer(state = initialVal, action) {
  switch (action.type) {
    case 'order/list':
      return { value: await loadOrders(action.payload) }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

async function filterReducer(state = {}, action) {
  switch (action.type) {
    case 'filter/set':
      console.log('dispatching filter:set', action.payload)
      return { filter: action.payload }
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(ordersReducer)
const storeFilter = createStore(filterReducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()))

export {
  store,
  storeFilter
}

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'counter/incremented' })
// {value: 1}
store.dispatch({ type: 'counter/incremented' })
// {value: 2}
store.dispatch({ type: 'counter/decremented' })
// {value: 1}
