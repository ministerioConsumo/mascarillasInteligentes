/**
 * Capacitor build extras
 */
import { Plugins } from '@capacitor/core'
const { App, LocalNotifications } = Plugins

declare var window: any

App.addListener('backButton', () => {
  const url = window.location.pathname
  const go = url => window.myHistory && window.myHistory.push(url)

  // If there is a modal open, close it.
  if (window.myModal && window.myModal.modal) {
    window.myModal.hide()
    return
  }

  if (url === '/') {
    // This is the app entry point, so the only "back" is exitting
    App.exitApp()
  } else if (url.match('/mask/[0-9]+')) {
    // From a mask view, go to the mask list (ie: home)
    go('/')
  } else {
    // Unknown route: Go back to the home
    go('/')
  }
})

LocalNotifications.requestPermission()
