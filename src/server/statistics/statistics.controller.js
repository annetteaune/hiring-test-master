import { sites } from "../sites/sites.db.js";
import { oilRigs } from "../oil-rigs/oil-rigs.db.js";

let sitesList = sites.slice();
let oilRigsList = oilRigs.slice();

export default class StatisticsController {
  constructor() {}

  getSitesCount = (req, res) => {
    const norwegianSites = sitesList.filter(
      (site) => site.country.toLowerCase() === "norway"
    );
    const stats = {
      norwegianSites: norwegianSites.length,
      totalSites: sitesList.length,
    };
    res.json(stats);
  };

  getRigsCount = (req, res) => {
    const norwegianSites = sitesList.filter(
      (site) => site.country.toLowerCase() === "norway"
    );
    const norwegianRigIds = norwegianSites
      .flatMap((site) => site.oilRigs || [])
      .filter((rigId) => oilRigsList.some((rig) => rig.id === rigId)) //valid only
      .filter((id, index, arr) => arr.indexOf(id) === index);

    const stats = {
      norwegianRigs: norwegianRigIds.length,
      totalRigs: oilRigsList.length,
    };
    res.json(stats);
  };

  getHistogramCount = () => {
    //todo
  };
}
