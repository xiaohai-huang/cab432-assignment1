import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import ImageUploader from "../components/ImageUploader";
import useStudentNumber from "../utils/useStudentNumber";
import { getAssessments, getNews } from "../utils/api";
import { login, setAssessment, setNews, setUnits } from "../redux/qutSlice";
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
      dispatch(setAssessment(assessments));
      dispatch(setUnits(units));
      dispatch(setNews(news));
      history.push("/content");
    }
    console.log({ data, sNumber, pwd });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageUploader getBase64={setBase64} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
      </Box>
    </Container>
  );
}

export default LoginForm;
