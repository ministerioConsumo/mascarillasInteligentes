import { Plugins } from '@capacitor/core'
import { MaskState, Mask, MaskType } from "../types"

const { LocalNotifications } = Plugins

const notifications = ({ getState }) => {

  let state: MaskState = getState().masks

  return next => action => {
    const ret = next(action)
    const newState: MaskState = getState().masks
    if (state !== newState) {
      // On state change, sync the notifications
      syncNotifications(newState)
      state = newState
    }
    return ret
  }
}

const syncNotifications = async (state: MaskState): Promise<void> => {
  // Find out the next mask to expire, if any, and when
  const now = Date.now()
  const inUseMasks = state.list
    .filter(m => m.currentUsageStart) // in use
    .filter(m => getMaskExpirationDate(m) > now) // not already expired
  inUseMasks.sort(expirationCmp)
  const mask = inUseMasks[0]
  const nextExpiration = inUseMasks.length && getMaskExpirationDate(mask)

  // Sync notification settings with next known expiration
  const pending = await LocalNotifications.getPending()
  if (pending.notifications.length) {
    await LocalNotifications.cancel(pending)
  }
  if (nextExpiration) {
    console.log('Next notification will happen at:', new Date(nextExpiration))
    let body = 'Cambia tu mascarilla por una nueva'
    if (mask.type === MaskType.REUSABLE_HYGIENIC || mask.type === MaskType.REUSABLE_TRANSPARENT) {
      body = 'Lava tu mascarilla o cámbiala por una nueva'
    }
    await LocalNotifications.schedule({
      notifications: [{
        id: mask.id,
        title: '¡¡Estás desprotegido!!',
        body,
        schedule: {
          at: new Date(nextExpiration)
        }
      }]
    })
  }
}

const getMaskExpirationDate = (mask: Mask): number => {
  if (!mask.currentUsageStart) return null
  return mask.currentUsageStart + (mask.maxUsageTime - mask.usageTime)
}

const expirationCmp = (a: Mask, b: Mask): number => {
  const ax = getMaskExpirationDate(a)
  const bx = getMaskExpirationDate(b)
  return ax - bx
}

export default notifications
