import blogsReducer from "./blogsReducer.js";
import deepFreeze from 'deep-freeze'

describe('blogsReducer', () => {


    test('returns new state with action ADD_COMMENT', () => {
        const state = [
            {id: "6014afe5bda62873d8733502", comments: []}
            ]

        const action = {
            type: 'ADD_COMMENT',
            comment: "red-comment",
            blogid: "6014afe5bda62873d8733502"
        }

        deepFreeze(state)
        const newState = blogsReducer(state, action)
        expect(newState[0].comments).toEqual(["red-comment"])

    })
})