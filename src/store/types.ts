import { Store } from 'redux'

export enum MaskType {
  SURGICAL = 'surgical',
  REUSABLE_HYGIENIC = 'reusable-hygienic',
  HYGIENIC = 'hygienic',
  PPE = 'ppe',
  TRANSPARENT = 'transparent',
  REUSABLE_TRANSPARENT = 'reusable-transparent'
}

export interface Mask {
  id: number
  name?: string
  type: MaskType
  addedDate: number

  usageTime: number
  maxUsageTime: number
  currentUsageStart?: number
  washCount: number
  lastUsage?: number

  customWashMax?: number
  customWashInfo?: string
}

export interface MaskCreationSettings {
  name?: string,
  type: MaskType
}

export interface MaskCustomSettings {
  customWashMax: number,
  customWashInfo: string
}

export interface MaskState {
  list: Mask[],
  nextId: number
}

export const MASK_ADD = 'MASK/ADD'
export const MASK_USE = 'MASK/USE'
export const MASK_UNUSE = 'MASK/UNUSE'
export const MASK_WASH = 'MASK/WASH'
export const MASK_SET_WASH_COUNT = 'MASK/SETWASHCOUNT'
export const MASK_CUSTOMIZE = 'MASK/CUSTOMIZE'
export const MASK_SET_TIME = 'MASK/SETTIME'
export const MASK_REMOVE = 'MASK/REMOVE'
export const MASK_LOAD_STATE = 'MASK/LOADSTATE'

export interface MaskAddAction {
  type: typeof MASK_ADD,
  mask: MaskCreationSettings,
  ts: number
}

export interface MaskUseAction {
  type: typeof MASK_USE,
  id: number,
  ts: number
}

export interface MaskUnuseAction {
  type: typeof MASK_UNUSE,
  id: number,
  ts: number
}

export interface MaskWashAction {
  type: typeof MASK_WASH,
  id: number,
}

export interface MaskSetWashCountAction {
  type: typeof MASK_SET_WASH_COUNT,
  id: number,
  count: number
}

export interface MaskCustomizeAction {
  type: typeof MASK_CUSTOMIZE,
  id: number,
  settings: MaskCustomSettings
}

export interface MaskSetTimeAction {
  type: typeof MASK_SET_TIME,
  id: number,
  time: number
}

export interface MaskRemoveAction {
  type: typeof MASK_REMOVE,
  id: number
}

export interface MaskLoadStateAction {
  type: typeof MASK_LOAD_STATE,
  state: MaskState
}

export type MaskAction =
  | MaskAddAction
  | MaskUseAction
  | MaskUnuseAction
  | MaskWashAction
  | MaskSetWashCountAction
  | MaskCustomizeAction
  | MaskSetTimeAction
  | MaskRemoveAction
  | MaskLoadStateAction

export type MaskStore = Store<MaskState, MaskAction>
