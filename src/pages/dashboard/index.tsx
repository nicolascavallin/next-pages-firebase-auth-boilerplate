import { DashboardLayout } from "@src/components/DashboardLayout";
import { useAuth } from "@src/hooks/useAuth";

function Content() {
  const { signOut } = useAuth();
  return (
    <div>
      <h2>Index</h2>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default function Page() {
  return (
    <DashboardLayout>
      <Content />
    </DashboardLayout>
  );
}
