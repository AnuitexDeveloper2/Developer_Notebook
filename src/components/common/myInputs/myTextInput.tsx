import  React, { FC }  from "react";
import { useField } from "formik";
import { Box, TextField } from "@mui/material";

 interface Props {
     label: any
     name: string;
     id?: string;
     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
 }

const MyTextInput: FC<Props> = (props ) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div>
        <TextField className="base-input" onChange={props.onChange} /*{...field} {...props} *//>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

export default MyTextInput