import { v4 as uid } from "uuid";

export default (url) => {
  return (req, res, next) => {
    if (req.url == url) {
      res.cookie("csrfToken", uid());
    }
    next();
  }
}
