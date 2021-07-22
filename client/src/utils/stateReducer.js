
export default function reducer(state, action) {
    switch (action.type) {
        case "setLoggedInUser": {
            //update loggedinUser's value
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setToken": {
            //update loggedinUser's value
            return {
                ...state,
                auth: {
                    ...state.auth,
                    token: action.data
                }
            }
        }
        default: return state
    }

}