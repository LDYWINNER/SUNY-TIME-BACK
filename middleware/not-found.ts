const notFoundMiddleware = (req, res) =>
  res.status(404).send("Route doesn't exist");

export default notFoundMiddleware;
