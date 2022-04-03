const fastify = require("fastify")();
const analyticsRoutes = require("./src/routes/analyticsRoutes");

fastify.register(require("fastify-cors"), {
  origin: "*",
  methods: ["POST"],
});

analyticsRoutes.forEach((route, index) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen(4000);
    console.log("Server start");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();