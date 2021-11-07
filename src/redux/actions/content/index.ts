import { ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { http } from "../../../helper/request"
import { Record, Topic } from "../../../types/content"
import * as types from "./types"


export const GetContent: ActionCreator<
    ThunkAction<Promise<void>,
        any,
        null,
        types.GetContentAction>> = (topicId: any) => {
            return async (dispatch: Dispatch) => {
                const config = {
                    method: 'GET',
                    path: `contents/admin/${topicId}`,
                }

                const result = await http(config)
                const getTopicsAction = {
                    type: "GET_ITEMS",
                    result: result.parsedBody
                }
                return result.parsedBody as any
            }
        }


export const CreateContent:  ActionCreator<
ThunkAction<Promise<Record>,
    any,
    null,
    types.CreateContentAction>> = (data) => {
        return async (dispatch: Dispatch)=> {
            const config = {
                method: 'POST',
                path: 'contents/admin',
                body: data
            }

            const result = await http(config)
            return result.parsedBody as any
        }
}

export const RemoveContent:  ActionCreator<
ThunkAction<Promise<Record>,
    any,
    null,
    types.RemoveContentAction>> = (id) => {
        return async (dispatch: Dispatch)=> {
            const config = {
                method: 'DELETE',
                path: `contents/admin/${id}`,
            }

            const result = await http(config)
            return result.parsedBody as any
        }
}

export const EditContent:  ActionCreator<
ThunkAction<Promise<Record>,
    any,
    null,
    types.CreateContentAction>> = (data, id) => {
        return async (dispatch: Dispatch)=> {
            const config = {
                method: 'PUT',
                path: `contents/admin/${id}`,
                body: data
            }

            const result = await http(config)
            return result.parsedBody as any
        }
}