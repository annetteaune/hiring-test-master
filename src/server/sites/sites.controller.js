import { sites } from "./sites.db";

// this is our global "db"
let sitesList = sites.slice();

export default class EmployeesController {
  constructor() {}

  //Create
  addSite = (req, res) => {
    // TODO: Add to employee
  };

  //Read
  getSites = (req, res) => {
    res.json(sitesList);
  };
  getSiteById = (req, res) => {
    const { id } = req.params;
    const site = sitesList.find((site) => site.id === id);

    if (!site) {
      return res.status(404).json({ error: "Site not found" });
    }

    res.json(site);
  };

  getSiteByName = (req, res) => {
    const { name } = req.params;
    const site = sitesList.find(
      (site) => site.name.toLowerCase() === name.toLowerCase()
    );

    if (!site) {
      return res.status(404).json({ error: "Site not found" });
    }

    res.json(site);
  };

  //Update
  updateSite = () => {
    //todo
  };

  //Delete
  deleteSite = () => {
    //todo
  };
}
