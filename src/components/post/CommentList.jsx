import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { teal } from "@mui/material/colors";

const CommentList = ({ name, text, date, profilePhoto }) => {
  return (
    <List
      sx={{
        // width: "100%",
        maxWidth: 360,
        bgcolor: teal[100],
        borderRadius: "50px 5px 0px 5px",
        marginBottom: "4px",
        padding: 0,
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name || "User"} src={profilePhoto} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
          }
          secondary={
            <>
              <Typography
                variant="caption"
                sx={{ display: "block", marginBottom: "4px" }}
              >
                {date}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                sx={{ fontSize: "0.85rem" }}
              >
                {text}
              </Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default CommentList;
