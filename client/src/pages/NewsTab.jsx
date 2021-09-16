import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";

import NewsItem from "../components/NewsItem";

function NewsTab({ news }) {
  console.log({ news });
  return (
    <>
      <Container>
        <Typography>
          Here are the news that are related to your study fields
        </Typography>
        <Box mb={3} />
        <Grid container spacing={3}>
          {news.map((n) => (
            <Grid xs={4} item key={n.title}>
              <NewsItem {...n} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default NewsTab;
