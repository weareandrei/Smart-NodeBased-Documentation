export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'

export const addNotification = (message, severity) => ({
    type: ADD_NOTIFICATION,
    message: message,
    severity: severity
})

export const dismiss_notification = (notificationId) => ({
    type: DISMISS_NOTIFICATION,
    notificationId: notificationId
})
