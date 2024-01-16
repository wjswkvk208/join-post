import * as React from "react";
import moment from "moment";
import "moment/locale/ko";
import { golfCourse } from "@/types/golfCourse";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Chip, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

// icons
import TagIcon from "@mui/icons-material/Tag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import KakaoTalkIcon from "../../../../components/common/KakaoTalkIcon";
import SmsIcon from "@mui/icons-material/Sms";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TourCard({
  cardId,
  golfCourse,
  gameDate,
  title,
  content,
  user,
  tags,
  kakao,
  phone,
  onView,
}: {
  cardId: string;
  golfCourse: golfCourse;
  gameDate: string;
  title: string;
  content: string;
  user?: any;
  tags: string[];
  kakao: boolean;
  phone: boolean;
  onView: any;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("asdf", Boolean(anchorEl), anchorEl);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar src={user.picture.data.attributes.url ? `${process.env.NEXT_PUBLIC_URL}${user.picture.data.attributes.url}` : ""} aria-label="recipe"></Avatar>}
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={golfCourse?.name}
          subheader={moment(gameDate).format("MMMM Do (dd) h:mm")}
        />
        <Menu
          id={"menu-appbar-" + title}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem key={"수정"} onClick={() => router.push(`/posts/edit/${cardId}`)}>
            <Typography textAlign="center">수정하기</Typography>
          </MenuItem>

          <MenuItem key={"마감"} onClick={handleCloseMenu}>
            <Typography textAlign="center">마감</Typography>
          </MenuItem>
        </Menu>
        {/* <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {kakao && (
            <IconButton aria-label="카카오톡">
              <KakaoTalkIcon />
            </IconButton>
          )}

          <IconButton aria-label="상세보기" onClick={onView}>
            <SmsIcon />
          </IconButton>

          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
          </CardContent>
          <CardContent>
            {tags.map(tag => (
              <Chip key={tag} label={tag} icon={<TagIcon />} size="small" />
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
