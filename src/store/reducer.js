const initialState = {
    isLogin: false,
    user_name:null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "LOGIN":
            return { isLogin: true,user_name:payload }

        case "QUIT":
            return { isLogin: false,user_name:payload }

        default:
            return state
    }
}
