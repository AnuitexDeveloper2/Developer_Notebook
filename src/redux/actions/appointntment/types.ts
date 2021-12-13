import { Action } from "redux"
import { Record } from "../../../types/content"

export interface GetAppointmentsAction extends Action<"GET_APPOINTMENTS"> { result: any }

export interface CreateAppointmentAction extends Action<"CREATE_APPOINTMENT"> { result: Record }

export interface EditAppointmentAction extends Action<"EDIT_APPOINTMENT"> { result: Record }

export interface DeleteAppointmentAction extends Action<"DELETE_APPOINTMENT"> { result: Record }

export type AppointmentActions = GetAppointmentsAction | CreateAppointmentAction | EditAppointmentAction | DeleteAppointmentAction