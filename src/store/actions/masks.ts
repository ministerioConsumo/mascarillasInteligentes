import {
  MASK_ADD,
  MASK_USE,
  MASK_UNUSE,
  MASK_WASH,
  MASK_SET_WASH_COUNT,
  MASK_CUSTOMIZE,
  MASK_SET_TIME,
  MASK_REMOVE,
  MASK_LOAD_STATE,
  MaskCreationSettings,
  MaskCustomSettings,
  MaskState,
  MaskAddAction,
  MaskUseAction,
  MaskUnuseAction,
  MaskWashAction,
  MaskSetWashCountAction,
  MaskCustomizeAction,
  MaskRemoveAction,
  MaskLoadStateAction,
  MaskSetTimeAction
} from '../types'

export const addMask = (mask: MaskCreationSettings): MaskAddAction =>
  ({ type: MASK_ADD, mask, ts: Date.now() })

export const startUsingMask = (id: number): MaskUseAction =>
  ({ type: MASK_USE, id, ts: Date.now() })

export const stopUsingMask = (id: number): MaskUnuseAction =>
  ({ type: MASK_UNUSE, id, ts: Date.now() })

export const washMask = (id: number): MaskWashAction =>
  ({ type: MASK_WASH, id })

export const setWashCount = (id: number, count: number): MaskSetWashCountAction =>
  ({ type: MASK_SET_WASH_COUNT, id, count })

export const customizeMask = (id: number, settings: MaskCustomSettings): MaskCustomizeAction =>
  ({ type: MASK_CUSTOMIZE, id, settings })

export const setTime = (id: number, time: number): MaskSetTimeAction =>
  ({ type: MASK_SET_TIME, id, time })

export const removeMask = (id: number): MaskRemoveAction =>
  ({ type: MASK_REMOVE, id })

export const loadMaskState = (state: MaskState): MaskLoadStateAction =>
  ({ type: MASK_LOAD_STATE, state })
