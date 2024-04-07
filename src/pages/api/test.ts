import authMiddleware from "@src/utils/auth-middleware";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => authMiddleware(req, res, async () => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  res.status(200).json({ name: "John Doe" });
});

export default handler;