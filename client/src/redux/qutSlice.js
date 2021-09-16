import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sNumber: "",
  password: "",
  units: [],
  assessments: [],
  news: [],
};

export const qutSlice = createSlice({
  name: "qut",
  initialState,
  reducers: {
    login: (state, action) => {
      const { sNumber, password } = action.payload;
      state.sNumber = sNumber;
      state.password = password;
    },
    setAssessment: (state, action) => {
      state.assessments = action.payload;
    },
    setUnits: (state, action) => {
      state.units = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, setAssessment, setUnits, setNews } = qutSlice.actions;

export default qutSlice.reducer;
