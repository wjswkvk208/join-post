import { Box, Link } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
const TagsBlock = styled(Box)`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
    }
  }
`;
const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <TagsBlock>
      {tags.map(tag => {
        return (
          <Link className="tag" href={`/board/list?tag=${tag}`} key={tag}>
            #{tag}
          </Link>
        );
      })}
    </TagsBlock>
  );
};

export default Tags;
