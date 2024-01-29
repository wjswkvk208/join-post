import { useNotification } from "@/hooks/swr/notification";
import { getDayMinuteCounter } from "@/utils/date";
import { Avatar, ListItemAvatar, ListItemText, MenuItem, Typography } from "@mui/material";
import React from "react";

const Notification = () => {
  const { data, mutate, isLoading } = useNotification();

  console.log(data);
  if (data) {
    return (
      <>
        {data.map(d => {
          return (
            <MenuItem key={d.id}>
              <ListItemAvatar>
                <Avatar alt={d.attributes.user.data.attributes.nickname} src={d.attributes.user.data.attributes.picture.data.attributes.url} />
              </ListItemAvatar>
              <ListItemText
                primary={d.attributes.user.data.attributes.nickname}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      {d.attributes.message}
                    </Typography>

                    <Typography variant="caption" color="text.primary">
                      {getDayMinuteCounter(new Date(d.attributes.createdAt))}
                    </Typography>
                  </React.Fragment>
                }
              />
            </MenuItem>
          );
        })}
      </>
    );
  }
};

export default Notification;
