import { sites } from "./sites.db";

// this is our global "db"
let sitesList = sites.slice();

export default class EmployeesController {
  //same as oil rig - todo look into if intentional? possible reusability?
  constructor() {}

  getSites = (req, res) => {
    res.json(sitesList);
  };

  addSite = (req, res) => {
    // TODO: Add to employee
  };
}
