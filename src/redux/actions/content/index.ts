import { ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { http } from "../../../helper/request"
import { Topic } from "../../../types/content"
import { GetTopicsAction } from "./types"

export const GetTopics: ActionCreator<
    ThunkAction<Promise<void>,
        any,
        null,
        GetTopicsAction>> = (data) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'POST',
                    path: 'auth/register',
                    body: data
                }

                const result = await http(config)
                
                const getTopicsAction = {
                    type: "GET_TOPICS",
                    result: result.parsedBody
                }
                dispatch(getTopicsAction)
            }
        }