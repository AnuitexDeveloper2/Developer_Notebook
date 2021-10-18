import { ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { http } from "../../../helper/request"
import { Record, Topic } from "../../../types/content"
import * as types from "./types"

export const GetTopics: ActionCreator<
    ThunkAction<Promise<void>,
        any,
        null,
        types.GetTopicsAction>> = () => {
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

export const GetTopic: ActionCreator<
    ThunkAction<Promise<Record>,
        any,
        null,
        types.GetTopicAction>> = (id: string) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'GET',
                    path: `topics/${id}`,
                }
                debugger
                const result = await http(config)
                return result.parsedBody as any
            }
        }

export const CreateTopic: ActionCreator<
    ThunkAction<Promise<Record>,
        any,
        null,
        types.CreateTopicAction>> = (data) => {
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



export const EditTopic: ActionCreator<
    ThunkAction<Promise<Record>,
        any,
        null,
        types.EditTopicAction>> = (data) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'PUT',
                    path: 'topics',
                    body: data
                }

                const result = await http(config)

                return result.parsedBody as any
            }
        }


export const GetItemsAction: ActionCreator<
    ThunkAction<Promise<void>,
        any,
        null,
        types.GetItemsAction>> = (topicId: any) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'GET',
                    path: 'contents/admin',
                }

                const result = await http(config)
                const getTopicsAction = {
                    type: "GET_ITEMS",
                    result: result.parsedBody
                }
                dispatch(getTopicsAction)
            }
        }
