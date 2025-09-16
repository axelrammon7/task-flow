import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("project/:id", "routes/project.$id.tsx"),
] satisfies RouteConfig;
