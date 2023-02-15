import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: Application) {
  app.use(
    createProxyMiddleware({
      target: "http://localhost:4002",
      changeOrigin: true,
    })
  );
};
