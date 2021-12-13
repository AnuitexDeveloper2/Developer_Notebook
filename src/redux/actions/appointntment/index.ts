import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk"
import { http } from "../../../helper/request";
import { CreateAppointmentAction, DeleteAppointmentAction, EditAppointmentAction, GetAppointmentsAction } from "./types";


export const GetAppointmentsByTopic: ActionCreator<ThunkAction<Promise<void>, any, null, GetAppointmentsAction>> = (topicId: string) => {
    return async (dispatch: Dispatch) => {
        const config = {
            method: 'GET',
            path: `appointment/${topicId}`,
        }

        const result = await http(config)
        const action: GetAppointmentsAction = {
            type: "GET_APPOINTMENTS",
            result: result.parsedBody
        }
        dispatch(action)
    }
}

/**
 * Create appointment
 * @param title 
 * @param topic 
 * @returns
 */
export const CreateAppointment: ActionCreator<ThunkAction<Promise<boolean>, any, null, CreateAppointmentAction>> = (title: string, topic: string) => {
    return async (dispatch: Dispatch) => {
        const config = {
            method: 'POST',
            path: 'appointment',
            body: { title, topic }
        }

        const result = await http(config)
        return result.parsedBody as any
    }
}

export const EditAppointment: ActionCreator<ThunkAction<Promise<boolean>, any, null, EditAppointmentAction>> = (title: string,id: string) => {
    return async (dispatch: Dispatch) => {
        const config = {
            method: 'PUT',
            path: `appointment/${id}`,
            body: {title: title}
        }

        const result = await http(config)
        return result.parsedBody as any
    }
}

export const RemoveAppointment:  ActionCreator<ThunkAction<Promise<boolean>, any, null, DeleteAppointmentAction>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        const config = {
            method: 'Delete',
            path: `appointment/${id}`,
            body: {}
        }

        const result = await http(config)
        return result.parsedBody as any
    }
}
