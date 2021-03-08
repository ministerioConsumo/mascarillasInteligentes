import { CLIENT_INIT } from 'universal-scripts'
import { loadMaskState } from '../actions/masks'

const localStorage = ({ dispatch, getState }) => {
  
  let state = getState().masks

  return next => action => {
    if (action.type === CLIENT_INIT) {
      // On startup, load saved state
      const saved = JSON.parse(window.localStorage.getItem('state-v2'))
      if (saved) {
        dispatch(loadMaskState(saved))
      }
    }
    const ret = next(action)
    const newState = getState().masks
    if (state !== newState) {
      // On state change, update the saved state
      window.localStorage.setItem('state-v2', JSON.stringify(newState))
      state = newState
    }
    return ret
  }
}

export default localStorage
