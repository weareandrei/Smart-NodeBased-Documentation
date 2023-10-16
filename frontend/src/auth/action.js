import {loadedDocumentation} from "@/action";

export const VALIDATE_USER_CREDENTIALS = 'ADD_NOTIFICATION'
export const USER_CREDENTIALS_CORRECT = 'USER_CREDENTIALS_CORRECT'
export const USER_CREDENTIALS_WRONG = 'USER_CREDENTIALS_WRONG'
export const USER_DATA_LOADED = 'USER_DATA_LOADED'
export const SIGN_OUT = 'SIGN_OUT'

const userCredentialsValidating = (user) => ({
    type: VALIDATE_USER_CREDENTIALS,
    user: user
})

const userCredentialsCorrect = () => ({
    type: USER_CREDENTIALS_CORRECT
})

const userCredentialsWrong = () => ({
    type: USER_CREDENTIALS_WRONG
})

const userDataLoaded = (data) => ({
    type: USER_DATA_LOADED,
    data: data
})

export const signOut = () => ({
    type: SIGN_OUT
})

export const validateUser = (credentials) => {
    return (dispatch) => {
        dispatch(userCredentialsValidating())

        fetch("http://localhost:8081/validateUserCredentials", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        console.log('loaded user correctly: ', data);
                        dispatch(userCredentialsCorrect())
                        dispatch(userDataLoaded(data));
                    });
                } else {
                    dispatch(userCredentialsWrong())
                }
            })
            .catch((error) => {
                dispatch(userCredentialsWrong())
            })
    }
}