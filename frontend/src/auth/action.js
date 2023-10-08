export const VALIDATE_USER_CREDENTIALS = 'ADD_NOTIFICATION'
export const USER_CREDENTIALS_CORRECT = 'USER_CREDENTIALS_CORRECT'
export const USER_CREDENTIALS_WRONG = 'USER_CREDENTIALS_WRONG'

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

export const validateUser = (credentials) => {
    return (dispatch) => {
        dispatch(userCredentialsValidating())

        console.log('fetching credentials, : ', credentials)

        fetch("http://localhost:8081/userCredentialsValidate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then((response) => {
                console.log('response from credentials, : ', response)
                if (response.ok) {
                    dispatch(userCredentialsCorrect())
                    console.log('correct credentials')
                } else {
                    dispatch(userCredentialsWrong())
                    console.log('wrong credentials')
                }
            })
            .catch((error) => {
                dispatch(userCredentialsWrong())
                console.log('wrong credentials')
            })
    }
}