import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "client/store/middleware/api/api";

const slice = createSlice({
  name: "sites",
  initialState: {
    loading: false,
    list: [],
    sortOrder: "none",
  },
  reducers: {
    sitesRequested: (sites) => {
      sites.loading = true;
    },
    sitesReceived: (sites, action) => {
      sites.list = action.payload;
      sites.loading = false;
    },
    sitesRequestFailed: (sites) => {
      sites.loading = false;
    },
    setSitesSortOrder: (sites, action) => {
      sites.sortOrder = action.payload;
    },
  },
});

export const {
  sitesRequested,
  sitesReceived,
  sitesRequestFailed,
  setSitesSortOrder,
} = slice.actions;
export default slice.reducer;

const url = "/sites";
export const sitesLoaded = () =>
  apiCallBegan({
    url,
    onStart: sitesRequested.type,
    onSuccess: sitesReceived.type,
    onError: sitesRequestFailed.type,
  });
