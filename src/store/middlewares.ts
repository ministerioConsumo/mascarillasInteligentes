import localStorage from './middlewares/localStorage'
import notifications from './middlewares/notifications'

declare var __CLIENT__: boolean

let middlewares = []

if (__CLIENT__) {
  middlewares.push(localStorage, notifications)
}

export default middlewares
