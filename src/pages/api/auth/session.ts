import { auth } from "@src/utils/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { COOKIE_ID_CSRF, COOKIE_ID_TOKEN } from "@src/utils/session";

const createSessionCookies = (res: NextApiResponse,) => {
  // const { exp } = jwtDecode(idToken);

  const token = serialize(COOKIE_ID_TOKEN, "idToken", {
    // httpOnly: true,
    // secure: true,
    // sameSite: "strict",
    // priority: "high",
    // path: '/',
    // ...(!!exp && { expires: new Date(exp * 1000) }),
  });

  const csrf = serialize(COOKIE_ID_CSRF, "encryptToken(idToken)", {
    // httpOnly: true,
    // secure: true,
    // sameSite: "strict",
    // priority: "high",
    // path: '/',
    // ...(!!exp && { expires: new Date(exp * 1000) }),
  });

  res.setHeader("Set-Cookie", [token, csrf]);
};

const removeSessionCookie = (res: NextApiResponse) => {
  const token = serialize(COOKIE_ID_TOKEN, '', {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    priority: "high",
    path: '/',
    maxAge: 0,
  });

  const csrf = serialize(COOKIE_ID_CSRF, '', {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    priority: "high",
    path: '/',
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", [token, csrf]);
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { idToken } = req.query;

  const verifiedToken = await auth().verifyIdToken(idToken?.toString() || "", true).catch(() => null);

  if (!idToken || !verifiedToken) {
    removeSessionCookie(res);

    res.status(200).end();
    return;
  }

  const IdToken = req.cookies[COOKIE_ID_TOKEN];

  const isSameToken = IdToken === idToken.toString();

  if (!isSameToken) {
    /**
     * If the token is not the same as the one in the cookie, we update the cookie.
     */
    createSessionCookies(res,);
  }

  res.status(200).end();
  return;
};

export default handler;