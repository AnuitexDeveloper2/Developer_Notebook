import * as Yup from "yup";


export const registerObject = Yup.object({
    firstName: Yup.string()
    .min(4,"Would be 4 at least charackters")
    .max(20,"Would be less than 20 charackters")
    .required("Required"),

    lastName: Yup.string()
    .min(4,"Would be 4 at least charackters")
    .max(20,"Would be less than 20 charackters")
    .required("Required"),

    email: Yup.string()
    .email('Invalid email')
    .required("Required"),

    password: Yup.string()
    .min(6,"Would be 6 at least charackters")
    .max(16,"Would be less than 16 charackters")
    .required("Required")
})