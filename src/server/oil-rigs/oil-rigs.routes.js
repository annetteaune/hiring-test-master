import OilRigsController from "./oil-rigs.controller";

export default (server) => {
  const oilRigsController = new OilRigsController();
  server.get("/api/oil-rigs", oilRigsController.getOilRigs);
  server.get("/api/oil-rigs/:id", oilRigsController.getOilRigById);
  server.get("/api/oil-rigs/name/:name", oilRigsController.getOilRigByName);
  server.post("/api/oil-rigs", oilRigsController.addOilRig);
  server.put("/api/oil-rigs/:id", oilRigsController.updateOilRig);
  server.patch("/api/oil-rigs/:id", oilRigsController.updateOilRig); //partial
  server.delete("/api/oil-rigs/:id", oilRigsController.deleteOilRig);
};
