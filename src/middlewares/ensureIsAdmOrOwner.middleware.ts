import { Request, Response, NextFunction } from "express";

const verifyIsAdmOrOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idParams = request.params.id;

  if (idParams === request.user.id) {
    return next();
  }

  if (request.user.isAdm === true) {
    return next();
  }
  return response.status(401).json({
    message: "You must be the account owner or adm to update this account.",
  });
};

export default verifyIsAdmOrOwner;
