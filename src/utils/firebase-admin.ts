import { cert, getApps, AppOptions, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig: AppOptions = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
  }),
};

const app = getApps()?.[0] || initializeApp(firebaseConfig);
const auth = () => getAuth(app);

export { auth };