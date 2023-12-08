import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'Learning Redux Toolkit', content: "I've heard good things."},
    { id: '2', title: 'Slices....', content: "The more I say slice, the more I like it."}
]

// can mutate the state using immer (state.push) in reducers, otherwise u gota do the spread op ...props
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: { 
            reducer(state, action) {
            state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }
                }
            }
        }
    }
})

// the postsSlice.actions bit, the actions is auto made with same name instead of doing manually
export const { postAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;