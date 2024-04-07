
import { auth } from "@src/utils/firebase-admin";
import { COOKIE_ID_CSRF, COOKIE_ID_TOKEN, encryptToken } from "@src/utils/session";
import { NextApiRequest, NextApiResponse } from "next";

const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function,
) => {
  const { cookies } = req;

  const idToken = cookies[COOKIE_ID_TOKEN];
  const csrf = cookies[COOKIE_ID_CSRF];

  if (!idToken || !csrf) {
    res.status(400).json({ hey: "nope" });
    return;
  }

  const isSameToken = csrf === encryptToken(idToken);

  if (!isSameToken) {
    res.status(401).json({ hey: false });
    return;
  }

  const verifiedToken = await auth().verifyIdToken(idToken, true).catch(() => null);

  if (!verifiedToken) {
    res.status(417).json({ hey: "expired" });
    return;
  }

  return next();
};

export default authMiddleware;