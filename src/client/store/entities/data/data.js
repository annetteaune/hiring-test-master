import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "client/store/middleware/api/api";

const slice = createSlice({
  name: "data", //adblocker dblocks 'statistics'
  initialState: {
    loading: false,
    sites: null,
    rigs: null,
  },
  reducers: {
    statisticsRequested: (statistics) => {
      statistics.loading = true;
    },
    sitesStatisticsReceived: (statistics, action) => {
      statistics.sites = action.payload;
      if (statistics.rigs !== null) {
        statistics.loading = false;
      }
    },
    rigsStatisticsReceived: (statistics, action) => {
      statistics.rigs = action.payload;
      if (statistics.sites !== null) {
        statistics.loading = false;
      }
    },
    statisticsRequestFailed: (statistics, action) => {
      statistics.loading = false;
    },
  },
});

export const {
  statisticsRequested,
  sitesStatisticsReceived,
  rigsStatisticsReceived,
  statisticsRequestFailed,
} = slice.actions;

export default slice.reducer;

export const loadSitesStatistics = () =>
  apiCallBegan({
    url: "/data/sites",
    onStart: statisticsRequested.type,
    onSuccess: sitesStatisticsReceived.type,
    onError: statisticsRequestFailed.type,
  });

export const loadRigsStatistics = () =>
  apiCallBegan({
    url: "/data/oil-rigs",
    onStart: statisticsRequested.type,
    onSuccess: rigsStatisticsReceived.type,
    onError: statisticsRequestFailed.type,
  });

export const loadAllStatistics = () => (dispatch) => {
  dispatch(loadSitesStatistics());
  dispatch(loadRigsStatistics());
};
