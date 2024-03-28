import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import usersReducer from "./reducers/usersReducer";
const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        loggedUser: loggedInUserReducer,
        users: usersReducer

    }
})

export default store