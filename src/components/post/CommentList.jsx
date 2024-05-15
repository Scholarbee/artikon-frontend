import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { teal } from "@mui/material/colors";

const CommentList = ({ name, text, date }) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: teal[100],
          borderRadius: "50px 5px 0px 5px",
          margin: "0 0 4px 0",
          padding:"0"
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="scholar" src="" />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <>
                <span>{date}</span>
                <br />
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {text}
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
    </>
  );
};

export default CommentList;
