import * as yup from "yup";
export const createRecyclerSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  address: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  location: yup.string().required("required"),
  state: yup.string().required("required"),
  gender: yup.string().required("required"),
  dateOfBirth: yup.string().required("required"),
  aggregatorId: yup.string().required("required"),
  disabilityStatus: yup.string().required("required"),
});
