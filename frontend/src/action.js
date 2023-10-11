export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'
export const LOADING_DOCUMENTATION = 'LOADING_DOCUMENTATION'
export const LOADED_DOCUMENTATION = 'LOADED_DOCUMENTATION'
export const LOADED_DOCUMENTATION_FAIL = 'LOADED_DOCUMENTATION_FAIL'

export const addNotification = (message, severity) => ({
    type: ADD_NOTIFICATION,
    message: message,
    severity: severity
})

export const dismiss_notification = (notificationId) => ({
    type: DISMISS_NOTIFICATION,
    notificationId: notificationId
})

export const loadingDocumentation = () => ({
    type: LOADING_DOCUMENTATION
})

export const loadedDocumentation = (response) => ({
    type: LOADED_DOCUMENTATION,
    documentation: response
})

export const loadedDocumentationFail = () => ({
    type: LOADED_DOCUMENTATION_FAIL
})

export const loadDocumentation = (documentationId) => {
    return (dispatch) => {
        console.log('loading documentation')
        dispatch(loadingDocumentation())

        fetch(`http://localhost:8081/loadDocumentation?documentationId=${documentationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        console.log('loaded documentation correctly: ', data);
                        dispatch(loadedDocumentation(data));
                    });
                } else {
                    console.log('error loading documentation, : ', response)
                    dispatch(loadedDocumentationFail())
                }
            })
            .catch((error) => {
                console.log('error loading documentation, : ', error)
                dispatch(loadedDocumentationFail())
            })
    }
}