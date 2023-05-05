import * as yup from "yup";

export const schema = yup.object({
    username:  yup.string().required().min(5).max(10),
    password: yup.string().required().min(6),
  }).required();

  