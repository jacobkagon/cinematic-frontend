export const loginUser = (user) => {
    return (dispatch) => {
        dispatch({type: "LOGIN_USER", user})
    }
}

export const loggedIn = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGGED_IN'})
    }
}