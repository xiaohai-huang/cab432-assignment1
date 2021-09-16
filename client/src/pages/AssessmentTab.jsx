import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Assessment from "../components/Assessment";

function AssessmentTab({ units, assessments }) {
  return (
    <>
      <Container>
        <Typography>
          Here are the assessments you have to complete this semester
        </Typography>
        <Box mb={3} />
        <Grid container spacing={3}>
          {assessments.map((unit, i) => (
            <Grid item key={i} xs={12} md={6}>
              <Typography variant="h6">
                {units[i].unitCode}-{units[i].unitName}
              </Typography>
              {unit.map((a) => (
                <Assessment key={a.assessment_number} {...a} />
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default AssessmentTab;
