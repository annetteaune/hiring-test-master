import StatisticsController from "./statistics.controller";

export default (server) => {
  const statisticsController = new StatisticsController();
  server.get("/api/data/sites", statisticsController.getSitesCount);
  server.get("/api/data/oil-rigs", statisticsController.getRigsCount);
  server.get("/api/data/histogram", statisticsController.getHistogramCount);
};
