import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSignUp } from "../api/user.api";
import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

const SignupPage = () => {
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: yup.object({
      username: yup.string()
        .required("username is required")
        .min(6)
        .max(15),
      password: yup.string()
        .required("password is requried")
        .min(8),
    }),
    onSubmit: (values) => onSignUp(values)
  });

  const onSignUp = async ({ username, password }) => {
    if (isRequest) return;
    setIsRequest(true);

    const { response, err } = await userSignUp({ username, password });

    setIsRequest(false);

    if (response) {
      toast.success("Signup success");
      navigate("/signin");
    }

    if (err) toast.error(err.message);
  };

  return (
    <Box component="form" noValidate onSubmit={form.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          placeholder="username"
          name="username"
          value={form.values.username}
          onChange={form.handleChange}
          error={form.touched.username && form.errors.username != undefined}
          helperText={form.touched.username && form.errors.username}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="password"
          name="password"
          value={form.values.password}
          onChange={form.handleChange}
          error={form.touched.password && form.errors.password != undefined}
          helperText={form.touched.password && form.errors.password}
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          loading={isRequest}
          color="primary"
        >
          signup
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default SignupPage;