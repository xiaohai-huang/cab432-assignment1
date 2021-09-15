import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import ImageUploader from "./ImageUploader";
import useStudentNumber from "../utils/useStudentNumber";

function LoginForm() {
  const [base64, setBase64] = useState("");
  const { sNumber, loading, error } = useStudentNumber(base64);
  const [pwd, setPwd] = useState("");
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
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ sNumber, pwd });
          }}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
