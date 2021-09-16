import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  limitLines: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 5,
    "-webkit-box-orient": "vertical",
  },
}));

export default function NewsItem({
  title,
  link,
  creator,
  description,
  pubDate,
  image_url,
  keywords,
}) {
  const date = dayjs(pubDate).format("MMMM D, YYYY");
  const author = creator ? creator[0] : "";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [like, setLike] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="author" className={classes.avatar}>
            {author[0]}
          </Avatar>
        }
        title={title}
        subheader={date}
      />
      {image_url && (
        <CardMedia className={classes.media} image={image_url} title={title} />
      )}
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          classes={{
            root: classes.limitLines,
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="like the news"
          onClick={() => setLike((prev) => !prev)}
        >
          <FavoriteIcon color={like ? "error" : undefined} />
        </IconButton>
        <IconButton aria-label="share" onClick={() => window.open(link)}>
          <ShareIcon />
        </IconButton>
        {keywords && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      {keywords && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Keywords:</Typography>
            <Typography paragraph>
              <Typography component="span">{keywords.join(", ")} </Typography>
            </Typography>
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
}
