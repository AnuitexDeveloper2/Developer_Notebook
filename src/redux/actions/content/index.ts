import { ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { http } from "../../../helper/request"
import { Record, Topic } from "../../../types/content"
import { CreateTopicAction, GetTopicsAction } from "./types"

export const GetTopics: ActionCreator<
    ThunkAction<Promise<void>,
        any,
        null,
        GetTopicsAction>> = () => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'GET',
                    path: 'topics',
                }

                const result = await http(config)

                const getTopicsAction = {
                    type: "GET_TOPICS",
                    result: result.parsedBody
                }
                dispatch(getTopicsAction)
            }
        }

export const CreateTopic: ActionCreator<
    ThunkAction<Promise<Record>,
        any,
        null,
        CreateTopicAction>> = (data) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'POST',
                    path: 'topics',
                    body: data
                }

                const result = await http(config)

                const getTopicsAction = {
                    type: "CREATE_TOPIC",
                    result: result.parsedBody
                }
                return result.parsedBody as any
            }
        }
