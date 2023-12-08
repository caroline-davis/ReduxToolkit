import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice;"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postReducer,
        users: usersReducer,
    }
})