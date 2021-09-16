import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectAssessments,
  selectNews,
  selectSNumber,
  selectUnits,
  setAssessments,
  setNews,
  setUnits,
} from "../redux/qutSlice";
import { useHistory } from "react-router-dom";
import AssessmentTab from "./AssessmentTab";
import NewsTab from "./NewsTab";
import { ASSESSMENTS_DATA, NEWS_DATA, UNIT_DATA } from "../utils/data";
import { Box, Button, Typography } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ContentPage() {
  const classes = useStyles();
  const history = useHistory();
  const [tabIndex, setTabIndex] = React.useState(0);
  const news = useSelector(selectNews);
  const units = useSelector(selectUnits);
  const assessments = useSelector(selectAssessments);
  const sNumber = useSelector(selectSNumber);
  const dispatch = useDispatch();
  // No info, ask the user to login
  // if (units.length === 0 || assessments.length === 0) {
  //   history.push("/login");
  //   return <></>;
  // }

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  let content;
  switch (tabIndex) {
    case 0: {
      content = (
        <AssessmentTab
          units={units.length === 0 ? UNIT_DATA : units}
          assessments={
            assessments.length === 0 ? ASSESSMENTS_DATA : assessments
          }
        />
      );
      break;
    }
    case 1: {
      content = <NewsTab news={news.length === 0 ? NEWS_DATA : news} />;
      break;
    }
    default: {
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Assessments" {...a11yProps(0)} />
            <Tab label="News" {...a11yProps(1)} />
          </Tabs>
          <Box pr={3} display="flex" alignItems="center">
            <Typography>QUT Student Number: {sNumber || "N1999999"}</Typography>
            <Box ml={1} />
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={() => {
                // Reset Redux state
                dispatch(login({ sNumber: "", password: "" }));
                dispatch(setAssessments([]));
                dispatch(setUnits([]));
                dispatch(setNews([]));
                history.push("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Box mt={3} />
      {content}
    </div>
  );
}
