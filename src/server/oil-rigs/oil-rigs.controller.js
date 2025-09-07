import { oilRigs } from "./oil-rigs.db";

// this is our global "db"
let oilRigsList = oilRigs.slice();

export default class EmployeesController {
  constructor() {}

  //Create
  addOilRig = (req, res) => {
    // TODO: Add to employee
  };

  //Read
  getOilRigs = (req, res) => {
    res.json(oilRigsList);
  };

  getOilRigById = (req, res) => {
    const { id } = req.params;
    const oilRig = oilRigsList.find((rig) => rig.id === id);

    if (!oilRig) {
      return res.status(404).json({ error: "Oil rig not found" });
    }

    res.json(oilRig);
  };

  getOilRigByName = (req, res) => {
    const { name } = req.params;
    const oilRig = oilRigsList.find(
      (rig) => rig.name.toLowerCase() === name.toLowerCase()
    );

    if (!oilRig) {
      return res.status(404).json({ error: "Oil rig not found" });
    }

    res.json(oilRig);
  };

  //Updtae
  updateOilRig = () => {
    //todo
  };

  //Delete
  deleteOilRig = () => {
    //todo
  };
}
