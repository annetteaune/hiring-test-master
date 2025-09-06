import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "client/store/middleware/api/api";

const slice = createSlice({
  name: "oilRigs",
  initialState: {
    loading: false,
    list: [],
    expanded: false,
    sortOrder: "none",
  },
  reducers: {
    oilRigsRequested: (oilRigs) => {
      oilRigs.loading = true;
    },
    oilRigsReceived: (oilRigs, action) => {
      oilRigs.list = action.payload;
      oilRigs.loading = false;
    },
    oilRigsRequestFailed: (oilRigs) => {
      oilRigs.loading = false;
    },
    setRigsExpanded: (oilRigs, action) => {
      oilRigs.expanded = action.payload;
    },
    setRigsSortOrder: (oilRigs, action) => {
      oilRigs.sortOrder = action.payload;
    },
  },
});

export const {
  oilRigsRequested,
  oilRigsReceived,
  oilRigsRequestFailed,
  setRigsExpanded,
  setRigsSortOrder,
} = slice.actions;
export default slice.reducer;

const url = "/oil-rigs";
export const oilRigsLoaded = () =>
  apiCallBegan({
    url,
    onStart: oilRigsRequested.type,
    onSuccess: oilRigsReceived.type,
    onError: oilRigsRequestFailed.type,
  });
