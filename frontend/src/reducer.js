import map from 'lodash/map'
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'

import {
    ADD_NOTIFICATION,
    DISMISS_NOTIFICATION
} from "./action"

const initialState = {
    notifications : []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            console.log('Add notification, action :', action)
            return {
                ...state,
                notifications: [...state.notifications, {
                    message : action.message,
                    severity : action.severity,
                    id : generateNotificationId(state.notifications)
                }]
            }
        case DISMISS_NOTIFICATION:
            return {
                ...state,
                notifications: dismissNotification(state.notifications, action.notificationId)
            }
        default:
            return state
    }
}

const generateNotificationId = (notifications) => {
    const ids = map(notifications, (notification) => notification.id)
    const sortedIds = sortBy(ids)

    const smallestAvailableId = reduce(sortedIds, (result, id) => {
        if (id === result) {
            return result + 1
        }
        return result
    }, sortedIds[0] === 1 ? 2 : 1)

    return smallestAvailableId
}

const dismissNotification = (notifications, idToDismiss) =>
    notifications.filter(notification => notification.id !== idToDismiss)

export default appReducer
