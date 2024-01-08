import { Box, Button, Chip, ChipProps, Divider, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
const TagBoxBlock = styled(Box)`
  width: 100%;
  //border-top: 1px solid;
  padding-top: 2rem;
  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagDiv = styled(Box)`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid;
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
`;
// const Tag = styled(Box)`
//   margin-right: 0.5rem;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.5;
//   }
// `;
const Tag = (props: ChipProps) => {
  return <Chip {...props}></Chip>;
};
const TagListBlock = styled(Box)`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo(({ tag, onRemove }: any) => <Tag onDelete={() => onRemove(tag)} label={tag}></Tag>);
TagItem.displayName = "TagItem";

const TagList = React.memo(({ tags, onRemove }: { tags: string[]; onRemove: Function }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove}></TagItem>
    ))}
  </TagListBlock>
));
TagList.displayName = "TagList";

const TagBox = ({ tags, onChangeTags }: { tags: string[]; onChangeTags: Function }) => {
  const [input, setInput] = useState("");
  const [localTags, setLocalTags] = useState<string[]>([]);

  const insertTag = useCallback(
    (tag: string) => {
      if (!tag) return;
      if (localTags && localTags.includes(tag)) return;
      const reg = /([^a-zA-z가-힣ㄱ-ㅎ\d\s])/gi;
      const newTag = tag.replace(reg, "").trim();

      if (!newTag) return;

      const nextTags = [...localTags, newTag];

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onRemove = useCallback(
    (tag: string) => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput("");
    },
    [input, insertTag]
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);
  return (
    <TagBoxBlock>
      {/* <TagForm onSubmit={onSubmit}>
        
        
        
      </TagForm>*/}
      <TagDiv>
        <InputBase sx={{ ml: 1, flex: 1 }} value={input} onChange={onChange} placeholder="#태그" inputProps={{ "aria-label": "search google maps" }} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button onClick={onSubmit} variant="outlined" startIcon={<AddIcon />}>
          추가
        </Button>
      </TagDiv>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
