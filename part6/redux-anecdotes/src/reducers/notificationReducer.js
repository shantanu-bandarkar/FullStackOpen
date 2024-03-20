import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNoti(state, action) {
            return action.payload
        },
        removeNoti(state, action) {
            return null
        }
    }
})

export const { setNoti, removeNoti } = notificationSlice.actions

export default notificationSlice.reducer