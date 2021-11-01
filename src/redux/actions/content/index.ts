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
                    path: 'contents/admin',
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
            debugger
            return result.parsedBody as any
        }
}