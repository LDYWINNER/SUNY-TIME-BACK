import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: Application) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "http://localhost:4002",
      changeOrigin: true,
    })
  );
};
