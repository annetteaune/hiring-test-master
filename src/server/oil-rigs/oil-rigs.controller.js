import { oilRigs } from "./oil-rigs.db";

// this is our global "db"
let oilRigsList = oilRigs.slice();

export default class EmployeesController {
  //strange name choice, intentional or error? todo
  constructor() {}

  getOilRigs = (req, res) => {
    res.json(oilRigsList);
  };

  addOilRig = (req, res) => {
    // TODO: Add to employee
  };
}
