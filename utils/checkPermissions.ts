import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (
  requestUser: { userId: any },
  resourceUserId: { toString: () => any }
) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
