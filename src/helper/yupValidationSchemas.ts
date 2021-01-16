import * as Yup from "yup";


export const registerObject = Yup.object({
    firstName: Yup.string()
})