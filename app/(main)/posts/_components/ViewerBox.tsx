"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Loading from "@/components/common/Loading";
import Tags from "@/app/(main)/posts/_components/Tags";

const ViewerBlock = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ mt: "4rem" }}>{children}</Box>;
};

const PostHead = styled(Box)`
  border-bottom: 1px solid;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled(Box)({
  fontSize: "1.3125rem",
});

const ViewerBox = ({ post, error, isLoading, actionButtons }: any) => {
  if (error) {
    return <></>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // console.log(post.user._id, session?.user._id);
  return (
    <ViewerBlock>
      <PostHead>
        <h1>{post.title}</h1>
        {/* <SubInfo username={post.user.username ?? post.user.email ?? ""} publishedDate={new Date()} /> */}
        <Tags tags={post.tags} />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: post.content }}></PostContent>
    </ViewerBlock>
  );
};

export default ViewerBox;
