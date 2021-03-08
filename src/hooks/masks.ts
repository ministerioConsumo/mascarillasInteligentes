import { useSelector, useStore } from 'react-redux'
import { addMask, customizeMask, setTime, startUsingMask, stopUsingMask, washMask, removeMask, setWashCount } from 'src/store/actions/masks'
import { Mask, MaskCreationSettings, MaskCustomSettings } from 'src/store/types'

export const useMasks = (): Mask[] => {
  return useSelector(s => s.masks.list)
}

export const useMask = (id: number): Mask => {
  return useSelector(s => s.masks.list.find((m: Mask) => m.id === id))
}

export const useMaskActions = () => {
  const { dispatch, getState } = useStore()
  return {
    add: (settings: MaskCreationSettings): Mask => {
      dispatch(addMask(settings))
      return getState().masks.list.slice(-1)[0]
    },
    use: (id: number): void => dispatch(startUsingMask(id)),
    unuse: (id: number): void => dispatch(stopUsingMask(id)),
    wash: (id: number): void => dispatch(washMask(id)),
    setWashCount: (id: number, count: number): void => dispatch(setWashCount(id, count)),
    customize: (id: number, settings: MaskCustomSettings): void => dispatch(customizeMask(id, settings)),
    setTime: (id: number, time: number): void => dispatch(setTime(id, time)), // Note: sets *remaining* time
    remove: (id: number): void => dispatch(removeMask(id))
  }
}

export const useMaskIsUsed = (id: number) => {
  const mask = useMask(id)
  return !!mask.currentUsageStart || mask.usageTime > 0
}

export const useMaskInUse = (id: number) => !!useMask(id).currentUsageStart
