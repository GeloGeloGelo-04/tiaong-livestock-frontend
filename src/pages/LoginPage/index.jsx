import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./index.scss";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Verified, Visibility, VisibilityOff } from "@mui/icons-material";
import SnackBar from "../../components/shared/SnackBar";
import { ContainerModal } from "../../components/shared/ContainerModal";

const LoginPage = () => {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);
  const [loginShow, setLoginShow] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [pwdVisible1, setPwdVisible1] = useState(false);
  const [pwdVisible2, setPwdVisible2] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [email3, setEmail3] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [id, setId] = useState("");

  const [sendOTPOpen, setSendOTPOpen] = useState(false);
  const [resetPassOpen, setResetPassOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSev, setAlertSev] = useState("success");

  const [passNotMatch, setPassNotMatch] = useState(false);
  const [emailDup, setEmailDup] = useState(false);

  const [verificationOpen, setVerificationOpen] = useState(false);

  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post("/auth", { email, password });
      console.log(response.data);

      const accessToken = response.data.accessToken || null;

      setAuth({ accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);

      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status == 400) {
        setErrMsg("All Field required");
      } else if (error.response?.status == 401) {
        setErrMsg("Incorrect Email or Password");
      } else {
        setErrMsg("Login Failed");
      }
      setAlertSev("error");
      setAlertMsg(error?.response?.data?.message);
      setAlertOpen(true);
    }
    setDisabled(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post("/users", {
        lastname,
        firstname,
        middlename,
        email: email2,
        password: password1,
        password2: password2,
      });
      setId(response.data?.result?._id);
      setEmail2("");
      setPassword1("");
      setPassword2("");
      setFirstname("");
      setLastname("");
      setMiddlename("");

      setAlertSev("success");
      setAlertMsg(response?.data?.success);
      setAlertOpen(true);
      setErrMsg("");
      setVerificationOpen(true);
    } catch (error) {
      console.log(error);
      setAlertSev("error");
      setAlertMsg(error?.response?.data?.message);
      setAlertOpen(true);
      if (error?.response?.data?.message == "Password do not match") {
        setPassNotMatch(true);
      } else if (
        error?.response?.data?.message == "This Email Address is Already in use"
      ) {
        setEmailDup(true);
      } else {
        setErrMsg(error?.response?.data?.message);
      }
    }
    setDisabled(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.post("/reset-password", {
        email: email3,
      });
      setResetPassOpen(true);
      setSendOTPOpen(false);
      setAlertSev("success");
      setAlertMsg("OTP sent. Check your email.");
      setAlertOpen(true);
      setEmail(email3);
      setEmail3("");
    } catch (error) {
      console.log(error);
      setAlertSev("error");
      setAlertMsg(error?.response?.data?.message);
      setAlertOpen(true);
    }

    setDisabled(false);
  };

  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.post("/users/verify", {
        otp,
        id,
      });

      setVerificationOpen(false);
      setAlertSev("success");
      setAlertMsg("OTP VERIFIED SUCCESSFULLY");
      setAlertOpen(true);

      setOtp("");
      setId("");
    } catch (error) {
      console.log(error);
      setAlertSev("error");
      setAlertMsg(error?.response?.data?.message);
      setAlertOpen(true);
    }

    setDisabled(false);
  };

  const handleResetPassSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.put("/reset-password", {
        email,
        otp,
        password: newPassword1,
        password2: newPassword2,
      });
      console.log(response.data);

      setResetPassOpen(false);
      setAlertSev("success");
      setAlertMsg("Your password has been changed successfully.");
      setAlertOpen(true);
    } catch (error) {
      console.log(error);
      setAlertSev("error");
      setAlertMsg(error?.response?.data?.message);
      setAlertOpen(true);
    }
    setDisabled(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [
    email,
    password,
    firstname,
    lastname,
    middlename,
    email2,
    password1,
    password2,
  ]);

  useEffect(() => {
    setPassNotMatch(false);
  }, [password1, password2]);

  useEffect(() => {
    setEmailDup(false);
  }, [email2]);

  if (auth?.accessToken) {
    return <Navigate to="/" />;
  }
  //comment here another one
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgcolor="#CBD6FF"
      padding={5}
      boxSizing="border-box"
    >
      <Paper
        elevation={5}
        sx={{
          boxSizing: "border-box",
          borderRadius: 5,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          alignItems: "center",
          height: "100%",
          width: "100%",
          maxWidth: 1000,
          maxHeight: 650,
          justifyContent: loginShow ? "flex-start" : "flex-end",
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit}
          gap={2}
          width="50%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          padding={5}
          boxSizing={"border-box"}
          py={10}
          sx={{ display: loginShow ? "flex" : "none" }}
        >
          <Typography variant="h3" textAlign="center" mb={3}>
            Sign In
          </Typography>
          <TextField
            autoFocus
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            error={errMsg ? true : false}
            disabled={disabled ? true : false}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              autoComplete="off"
              id="password"
              type={pwdVisible ? "text" : "password"}
              name="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={errMsg ? true : false}
              disabled={disabled ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disabled}
                    edge="end"
                    onClick={() => setPwdVisible(!pwdVisible)}
                    aria-label="eye-btn"
                    aria-labelledby="eye-btn"
                    className="eye-btn"
                  >
                    {pwdVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Stack width="100%" alignItems="end">
            <Button
              onClick={() => setSendOTPOpen(true)}
              size="small"
              sx={{
                textDecoration: "none",
                color: disabled ? "lightgray" : "primary",
                pointerEvents: disabled && "none",
                p: 0,
              }}
            >
              Forgot password?
            </Button>
          </Stack>

          <Button
            size="large"
            variant="contained"
            type="submit"
            sx={{ mt: 1, px: 5 }}
          >
            Sign In
          </Button>
          <Stack direction="row">
            <Typography>Don't have an account? </Typography>
            <Button
              size="small"
              sx={{
                textDecoration: "none",
                color: disabled ? "lightgray" : "primary",
                pointerEvents: disabled && "none",
                p: 0,
                textTransform: "none",
              }}
              onClick={() => {
                setErrMsg("");
                setPassNotMatch(false);
                setLoginShow((prev) => !prev);
              }}
            >
              sign-up
            </Button>
          </Stack>
        </Stack>

        <Stack
          onSubmit={handleRegisterSubmit}
          component="form"
          gap={2}
          width="50%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          padding={5}
          boxSizing={"border-box"}
          py={10}
          sx={{ display: loginShow ? "none" : "flex" }}
        >
          <Typography variant="h3" textAlign="center" mb={3}>
            Sign up
          </Typography>
          <Stack direction="row" gap={1}>
            <TextField
              autoFocus
              label="Lastname"
              variant="outlined"
              fullWidth
              name="lastname"
              required
              error={errMsg ? true : false}
              disabled={disabled ? true : false}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              autoFocus
              label="Firstname"
              variant="outlined"
              fullWidth
              name="email"
              required
              error={errMsg ? true : false}
              disabled={disabled ? true : false}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              autoFocus
              label="Middle Initial"
              variant="outlined"
              fullWidth
              name="email"
              required
              error={errMsg ? true : false}
              disabled={disabled ? true : false}
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </Stack>
          <TextField
            autoFocus
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            required
            type="email"
            error={emailDup}
            disabled={disabled ? true : false}
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              autoComplete="off"
              id="password"
              type={pwdVisible1 ? "text" : "password"}
              name="pwd"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              error={passNotMatch}
              disabled={disabled ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disabled}
                    edge="end"
                    onClick={() => setPwdVisible1(!pwdVisible1)}
                    aria-label="eye-btn"
                    aria-labelledby="eye-btn"
                    className="eye-btn"
                  >
                    {pwdVisible1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <OutlinedInput
              autoComplete="off"
              id="password"
              type={pwdVisible2 ? "text" : "password"}
              name="pwd"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              error={passNotMatch}
              disabled={disabled ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disabled}
                    edge="end"
                    onClick={() => setPwdVisible2(!pwdVisible2)}
                    aria-label="eye-btn"
                    aria-labelledby="eye-btn"
                    className="eye-btn"
                  >
                    {pwdVisible2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>

          <Button
            size="large"
            variant="contained"
            type="submit"
            sx={{ mt: 1, px: 5 }}
            disabled={disabled}
          >
            Register
          </Button>
          <Stack direction="row">
            <Typography>Already have an account? </Typography>
            <Button
              size="small"
              sx={{
                textDecoration: "none",
                color: disabled ? "lightgray" : "primary",
                pointerEvents: disabled && "none",
                p: 0,
                textTransform: "none",
              }}
              onClick={() => {
                setErrMsg("");
                setPassNotMatch(false);
                setLoginShow((prev) => !prev);
              }}
            >
              sign-in
            </Button>
          </Stack>
        </Stack>

        <Box
          className={loginShow ? "gradient-bg login-show" : "gradient-bg"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={3}
        >
          <img src={logo} style={{ maxWidth: 150, borderRadius: "100%" }} />
        </Box>
      </Paper>

      <SnackBar
        position={{ horizontal: "center", vertical: "top" }}
        onClose={setSnackOpen}
        open={snackOpen}
        msg={"New user has been created successfully!"}
      />

      <SnackBar
        position={{ horizontal: "center", vertical: "top" }}
        onClose={setSnackOpen}
        open={snackOpen}
        msg={"New user has been created successfully!"}
      />

      <SnackBar
        position={{ horizontal: "center", vertical: "top" }}
        onClose={setAlertOpen}
        open={alertOpen}
        msg={alertMsg}
        severity={alertSev}
      />

      <ContainerModal
        maxWidth="xs"
        title="Forgot your Password?"
        open={sendOTPOpen}
        onClose={() => setSendOTPOpen(false)}
        onSubmit={handleSendOTP}
        actionButton={
          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={disabled}
          >
            Send OTP
          </Button>
        }
      >
        <TextField
          autoFocus
          label="ENTER YOUR EMAIL"
          variant="outlined"
          fullWidth
          name="email"
          value={email3}
          onChange={(e) => setEmail3(e.target.value)}
          required
          type="email"
          error={errMsg ? true : false}
          disabled={disabled ? true : false}
        />
      </ContainerModal>

      <ContainerModal
        maxWidth="xs"
        title="Reset your Password"
        open={resetPassOpen}
        onClose={() => setResetPassOpen(false)}
        onSubmit={handleResetPassSubmit}
        actionButton={
          <Button variant="contained" size="small" type="submit">
            Submit
          </Button>
        }
      >
        <TextField
          autoFocus
          label="Enter your OTP"
          variant="outlined"
          fullWidth
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          error={errMsg ? true : false}
          disabled={disabled ? true : false}
        />
        <TextField
          autoFocus
          label="New Password"
          variant="outlined"
          fullWidth
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
          required
          error={errMsg ? true : false}
          disabled={disabled ? true : false}
        />
        <TextField
          autoFocus
          label="Confirm new password"
          variant="outlined"
          fullWidth
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          required
          error={errMsg ? true : false}
          disabled={disabled ? true : false}
        />
      </ContainerModal>

      <ContainerModal
        maxWidth="xs"
        title="Verify your account"
        open={verificationOpen}
        onClose={() => {
          setOtp("");
          setVerificationOpen(false);
        }}
        onSubmit={handleSubmitVerification}
        actionButton={
          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={disabled}
          >
            Submit
          </Button>
        }
      >
        <TextField
          autoFocus
          label="Enter your OTP"
          variant="outlined"
          fullWidth
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          error={errMsg ? true : false}
          disabled={disabled ? true : false}
        />
      </ContainerModal>
    </Box>
  );
};

export default LoginPage;
