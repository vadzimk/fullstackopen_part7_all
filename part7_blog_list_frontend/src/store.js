// import React from "react";
// import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
// import App from "./App.js";
import notificationReducer from "./reducers/notificationReducer.js";
import thunk from "redux-thunk";
import blogsReducer from "./reducers/blogsReducer.js";
import userReducer from "./reducers/usersReducer.js";



const reducer = combineReducers({notification: notificationReducer, blogs: blogsReducer, user: userReducer})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

// store.subscribe(()=>
//     ReactDOM.render(<App/>, document.getElementById('root'))
// )

export default store


// git behaves weired