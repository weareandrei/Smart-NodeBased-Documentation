export default () => (next) => (action) => {
    if (!action.promise) {
        return next(action)
    }

    dispatchRequestAction(next, action)
    return dispatchActionWithPromise(action, next)
}

const dispatchActionWithPromise = (action, next) =>
    action.promise()
        .then(responseDispatch(next, action))
        .catch(handleError(next, action))

const handleError = (next, action) => (response) => {
    window.console.log('action error - handleError ->', action, response)
    action.type += '_ERROR'
    action.response = response
    return next(action)
}

const responseDispatch = (next, action) => (response) => {
    if (response.status === 'error' || response.error) {
        //window.console.log('action error', response)
        return Promise.reject(response)
    }
    action.type += '_SUCCESS'
    action.response = response
    return next(action)
}

const dispatchRequestAction = (next, action) => {
    next({
        ...action,
        type: `${action.type}_REQUEST`
    })
}
