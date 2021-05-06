import * as Yup from "yup";


export const registerObject = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
})