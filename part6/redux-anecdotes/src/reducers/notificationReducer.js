import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNoti(state, action) {
            return action.payload
        },
    }
})

export const { setNoti, removeNoti } = notificationSlice.actions

export const setNotification = (text, duration) => {
    return dispatch => {
        dispatch(setNoti(text))
        setTimeout(() => { dispatch(setNoti(null)) }, duration * 1000);
    }
}

export default notificationSlice.reducer