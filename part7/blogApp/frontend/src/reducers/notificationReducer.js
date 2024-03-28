import { createSlice } from "@reduxjs/toolkit";
const initialState = { content: null, type: null }
const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotif(state, action) {
            return action.payload
        },
        clearNotif(state, action) {
            return initialState
        }
    }
})

export const { setNotif, clearNotif } = notificationReducer.actions

export const setNotification = (message, type) => {
    return async dispatch => {
        dispatch(setNotif({
            content: message,
            type
        }))
        setTimeout(() => {
            dispatch(clearNotif())
        }, 3000);
    }
}

export default notificationReducer.reducer