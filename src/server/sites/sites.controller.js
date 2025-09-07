import { sites } from "./sites.db";
import { v4 as uuid } from "uuid";

// this is our global "db"
let sitesList = sites.slice();

export default class EmployeesController {
  constructor() {}

  //Create
  addSite = (req, res) => {
    const { name, country, oilRigs = [] } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        error: "Name and coutry are required",
      });
    }

    const checkIfExists = sitesList.find(
      (site) => site.name.toLowerCase() === name.toLowerCase()
    );
    if (checkIfExists) {
      return res.status(409).json({ error: "Name already exists" });
    }

    const newSite = {
      id: uuid(),
      name: name.trim(),
      country: country.trim(),
      oilRigs,
    };

    sitesList.push(newSite);
    res.status(201).json(newSite);
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
  deleteSite = (req, res) => {
    const { id } = req.params;
    const siteToDelete = sitesList.find((site) => site.id === id);

    if (!siteToDelete) {
      return res.status(404).json({ error: "Site not found" });
    }

    sitesList = sitesList.filter((site) => site.id !== id);

    res.status(200).json({ message: "Deleted succesfully" });
  };
}
