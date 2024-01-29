import { _comment } from "@/app/(main)/posts/_types/comment";
import { updateComment, useComments } from "@/hooks/swr/comment";
import { getDayMinuteCounter } from "@/utils/date";
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CommentList = ({ postId }: { postId: string | number | undefined }) => {
  const { data: session } = useSession();
  const { data: comments, mutate } = useComments({ postId });
  const [text, setText] = useState<string>("");

  const handleOnKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await updateComment({ arg: { comment: text, post: postId } });
      if (comments) {
        mutate();
      }
      setText("");
    }
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {comments &&
          comments.map(comment => {
            // todo 추후 이미지서버로 수정해야함.
            return (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={comment.attributes.user.data.attributes.nickname} src={`${process.env.NEXT_PUBLIC_URL}${comment.attributes.user.data.attributes.picture.data.attributes.url}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.attributes.user.data.attributes.nickname}
                    secondary={
                      <React.Fragment>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2" color="text.primary">
                            {comment.attributes.comment}
                          </Typography>
                          <Typography variant="caption" color="text.primary">
                            {getDayMinuteCounter(new Date(comment.attributes.publishedAt))}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                    secondaryTypographyProps={{ component: "div" }} //기본값은 p태그라 p태그안에 div가 들어갈수 없음.
                  ></ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}

        <ListItem>
          <ListItemAvatar>
            <Avatar alt={session?.user.nickname} src={session?.user.image} />
          </ListItemAvatar>

          <TextField fullWidth placeholder="댓글을 남겨보세요." variant="outlined" onKeyDown={handleOnKeyPress} value={text} onChange={e => setText(e.target.value)} />
        </ListItem>
      </List>
    </>
  );
};

export default CommentList;
