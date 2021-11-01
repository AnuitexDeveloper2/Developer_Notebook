import { Reducer } from "redux";
import { Topic, Record } from "../../types/content";
import { TopicActions } from "../actions/topic/types";

export interface ContentState {
    topics: Array<Topic>
    records: Array<Record>
}

const initialState: ContentState = {
    topics: Array<Topic>(),
    records: Array<Record>()
}

const neverReached = (never: never) => { };

export const contentReducer: Reducer<ContentState, TopicActions> = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TOPICS":
           return {...state, topics: action.result}
        // default:
        //     neverReached(action)
    }
    return state
}