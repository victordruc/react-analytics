const analyticsController = require("../controller/analyticsController");

const analyticsRoutes = [
  {
    method: "POST",
    url: "/api/analytics",
    handler: analyticsController.post,
  },
];
module.exports = analyticsRoutes;