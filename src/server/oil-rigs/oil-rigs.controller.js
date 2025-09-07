import { oilRigs } from "./oil-rigs.db";
import { v4 as uuid } from "uuid";

// this is our global "db"
let oilRigsList = oilRigs.slice();

export default class EmployeesController {
  constructor() {}

  /*
  200 OK
  201 created 
  400 bad request - mangler
  404 not found
  409 conflict - eksisterer
  
  */

  //Create
  addOilRig = (req, res) => {
    const { name, manufacturer } = req.body;

    if (!name || !manufacturer) {
      return res.status(400).json({
        error: "Name and manufacturer are required",
      });
    }

    const checkIfExists = oilRigsList.find(
      (rig) => rig.name.toLowerCase() === name.toLowerCase()
    );
    if (checkIfExists) {
      return res.status(409).json({ error: "Name already exists" });
    }

    const newOilRig = {
      id: uuid(),
      name: name.trim(),
      manufacturer: manufacturer.trim(),
    };

    oilRigsList.push(newOilRig);

    res.status(201).json(newOilRig);
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
  deleteOilRig = (req, res) => {
    const { id } = req.params;
    const rigToDelete = oilRigsList.find((rig) => rig.id === id);

    if (!rigToDelete) {
      return res.status(404).json({ error: "Oil rig not found" });
    }

    oilRigsList = oilRigsList.filter((rig) => rig.id !== id);
    res.status(200).json({ message: "Deleted successfully" });
  };
}
