import { Reducer } from 'redux'
import { MASK_ADD, MASK_USE, MASK_UNUSE, MaskState, MaskAction, MASK_WASH, MASK_CUSTOMIZE, MASK_REMOVE, MASK_LOAD_STATE, MASK_SET_TIME, MASK_SET_WASH_COUNT } from '../types'
import { Mask, MaskType } from 'src/store/types'

const getMaxUsageTime = (type: MaskType): number => {
  if (type === MaskType.PPE) return 8 * 3600 * 1000
  return 4 * 3600 * 1000
}

type MaskReducer = Reducer<MaskState, MaskAction>

const initialState: MaskState = {
  list: [],
  nextId: 0
}

const reducer: MaskReducer = (state: MaskState = initialState, action) => {
  switch (action.type) {
    case MASK_ADD:
      const newMask: Mask = {
        id: state.nextId,
        name: action.mask.name,
        type: action.mask.type,
        addedDate: action.ts,
        usageTime: 0,
        maxUsageTime: getMaxUsageTime(action.mask.type),
        washCount: 0
      }
      return {
        nextId: state.nextId + 1,
        list: [...state.list, newMask]
      }
    case MASK_USE:
      return {
        nextId: state.nextId,
        list: state.list.map(mask => {
          if (mask.id !== action.id) return mask
          return {
            ...mask,
            currentUsageStart: action.ts
          }
        })
      }
    case MASK_UNUSE:
      return {
        nextId: state.nextId,
        list: state.list.map(mask => {
          if (mask.id !== action.id) return mask
          return {
            ...mask,
            currentUsageStart: null,
            usageTime: mask.usageTime + (action.ts - mask.currentUsageStart || action.ts),
            lastUsage: action.ts
          }
        })
      }
    case MASK_WASH:
      return {
        nextId: state.nextId,
        list: state.list.map(mask => {
          if (mask.id !== action.id) return mask
          return {
            ...mask,
            lastUsage: null,
            currentUsageStart: null,
            usageTime: 0,
            washCount: mask.washCount + 1
          }
        })
      }
    case MASK_SET_WASH_COUNT:
      return {
        nextId: state.nextId,
        list: state.list.map(mask => {
          if (mask.id !== action.id) return mask
          return {
            ...mask,
            washCount: action.count
          }
        })
      }
    case MASK_CUSTOMIZE:
      return {
        nextId: state.nextId,
        list: state.list.map(mask => {
          if (mask.id !== action.id) return mask
          return {
            ...mask,
            customWashMax: action.settings.customWashMax,
            customWashInfo: action.settings.customWashInfo,
          }
        })
      }
    case MASK_SET_TIME:
      return {
        nextId: state.nextId,
        list: state.list.map(mask => {
          if (mask.id !== action.id) return mask
          // Limit remaining time between 0 and max
          let usageTime = mask.maxUsageTime - action.time
          if (usageTime < 0) usageTime = 0
          if (usageTime > mask.maxUsageTime) usageTime = mask.maxUsageTime
          return {
            ...mask,
            currentUsageStart: null,
            usageTime,
          }
        })
      }
    case MASK_REMOVE:
      return {
        nextId: state.nextId,
        list: state.list.filter(mask => mask.id !== action.id)
      }
    case MASK_LOAD_STATE:
      return action.state
    default:
      return state
  }
}

export default reducer
