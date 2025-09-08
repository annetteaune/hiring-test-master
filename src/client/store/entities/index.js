import { combineReducers } from "redux";
import sites from "./sites/sites";
import oilRigs from "./oil-rigs/oil-rigs";
import data from "./data/data";

export default combineReducers({
  sites,
  oilRigs,
  data,
});
