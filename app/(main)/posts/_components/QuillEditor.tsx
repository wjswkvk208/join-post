"use client";

import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// const EditorBlock = styled(Responsive)`
//   padding-top: 5rem;
// `;

const QuillWrapper = styled("div")({
  ".ql-editor": {
    padding: 0,
    minHeight: 320,
    fontSize: "1rem",
    lineHeight: 1.5,
  },
});

const QuillEditor = (props: any) => {
  return (
    <QuillWrapper>
      <ReactQuill theme="snow" {...props} />
    </QuillWrapper>
  );
};

export default QuillEditor;
