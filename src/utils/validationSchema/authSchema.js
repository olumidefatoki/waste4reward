import * as yup from "yup";
export const signInSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Too Short!"),
});
