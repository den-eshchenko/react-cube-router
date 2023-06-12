import { createApi } from "@reduxjs/toolkit/query/react";
import { executeQueryWrapper } from "./executeQueryWrapper";

export const commonApi = createApi({
  reducerPath: "api",
  baseQuery: executeQueryWrapper,
  endpoints: _ => ({}),
  tagTypes: ["ROOMS"],
});