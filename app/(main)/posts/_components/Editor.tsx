"use client";
import { Box, Input } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const QuillWrapper = styled("div")({
  ".ql-editor": {
    padding: 0,
    minHeight: 320,
    fontSize: "1rem",
    lineHeight: 1.5,
  },
});

const Editor = (props: any) => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // console.log(props);
  return (
    <Box sx={{ py: "1rem" }}>
      <Input
        placeholder="제목을 입력하세요."
        // onChange={e => onChangeField({ key: "title", value: e.target.value })}
        // onChange={event =>
        //   props.onChange((e: any) => {
        //     return { ...e, title: event.target.value };
        //   })
        // }
        // value={props.value.title}
        {...props.regiser("title")}
        sx={{ fontSize: "2rem", outline: "none", pb: "0.5rem", border: "none", borderBottom: 1, borderColor: "primary.main", mb: "2rem", width: 1 }}
      />
      <QuillWrapper>
        <ReactQuill
          theme="snow"
          // value={props.value.content}
          // // onChange={v => onChangeField({ key: "content", value: v })}
          // onChange={v =>
          //   props.onChange((e: any) => {
          //     // console.log(e);
          //     return { ...e, content: v };
          //   })
          // }
        />
      </QuillWrapper>
    </Box>
  );
};

export default Editor;
