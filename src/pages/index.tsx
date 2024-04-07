import Link from "next/link";

import { SessionComponent } from "@src/components/Session";

export default function Page() {
  return (
    <div>
      <h1>Index</h1>
      <h2>Session status:</h2>
      <SessionComponent />
      <hr />
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
