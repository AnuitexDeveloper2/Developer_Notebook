import { AppointmentState } from "../../types/states";
import { Record } from "../../types/content";
import { Reducer } from "redux";
import { AppointmentActions } from "../actions/appointntment/types";

const initialState: AppointmentState ={
    appointments: Array<Record>()
}

export const appointmentReducer: Reducer<AppointmentState, AppointmentActions> = (state= initialState, action) => {
    switch (action.type) {
        case "GET_APPOINTMENTS":
            return {...state, appointments: action.result}
        default:
            return state
        }
}