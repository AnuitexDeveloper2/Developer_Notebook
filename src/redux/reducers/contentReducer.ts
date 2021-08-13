import { Reducer } from "redux";
import { Topic, Record } from "../../types/content";

export interface ContentState {
    topics: Array<Topic>
    records: Array<Record>
}

const initialState: ContentState = {
    topics: Array<Topic>(),
    records: Array<Record>()
}

const neverReached = (never: never) => { };

// export const userReducer: Reducer<ContentState, Content> = (state = initialState, action) => {
//     switch (action.type) {
//         case "REGISTER":
//             return { ...state, user: action.result.user }
//         case 'LOGIN':
//             return { ...state, user: action.result.User }
//         case "LogOut":
//             return state = initialState
//         default:
//             neverReached(action)
//     }
//     return state
// }