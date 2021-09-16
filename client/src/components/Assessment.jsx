import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
function Assessment({ assessment_number, name, short_description }) {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {assessment_number}. {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          Description: {short_description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default Assessment;
