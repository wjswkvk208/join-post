"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//import { koKR } from "@mui/x-data-grid/locales/koKR";
import { ko } from "date-fns/locale";
import { SWRConfig } from "swr";
import axios from "@/app/axios";

// import enGB from 'date-fns/locale/en-GB';
interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <SessionProvider>
        <SWRConfig
          value={{
            fetcher: (url: string) => axios.get(url).then(res => res.data), //url => fetch(url, options).then(res => res.json()),
          }}
        >
          {children}
        </SWRConfig>
      </SessionProvider>
    </LocalizationProvider>
  );
}

export default Providers;
