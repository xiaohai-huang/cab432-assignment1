import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import ImageUploader from "../components/ImageUploader";
import useStudentNumber from "../utils/useStudentNumber";
import { getAssessments, getNews } from "../utils/api";
import { login, setAssessments, setNews, setUnits } from "../redux/qutSlice";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [base64, setBase64] = useState("");
  const { sNumber, loading: idLoading, error } = useStudentNumber(base64);
  const [loading, setLoading] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPwdError(null);
    setLoading(true);

    const { data, error } = await getAssessments(sNumber, pwd);
    const units = data.map((item) => item.unit);
    const assessments = data.map((item) => item.assessments);
    // Fetch news about my study fields
    const news = await getNews(units.map((unit) => unit.unitName));
    setLoading(false);
    setPwdError(error);
    if (!error) {
      dispatch(login({ sNumber, password: pwd }));
      dispatch(setAssessments(assessments));
      dispatch(setUnits(units));
      dispatch(setNews(news));
      history.push("/content");
    }
    console.log({ data, sNumber, pwd });
  };

  return (
    <Box
      style={{
        backgroundImage: "url(/qutlogin-bg-min.jpg)",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          marginLeft: "60%",
        }}
      >
        <Paper
          variant="outlined"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "550px",
            padding: "30px",
          }}
        >
          <Typography variant="h4" align="center">
            QUT Student Study Helper Mashups
          </Typography>
          <Box mt={3} />
          <ImageUploader getBase64={setBase64} />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="QUT Student Number"
              disabled
              error={Boolean(error)}
              helperText={error}
              value={sNumber}
            />
            {idLoading && <LinearProgress />}
            <TextField
              error={Boolean(pwdError)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={pwdError}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={!sNumber || sNumber === -1 || !pwd}
            >
              Sign In
            </Button>
            {loading && <LinearProgress />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginForm;
