import { DashboardLayout } from "@src/components/DashboardLayout";
import { useAuthContext } from "@src/hooks/AuthContext";

function Content() {
  const { user } = useAuthContext();
  return (
    <div>
      <h2>Account</h2>
      <p>User: {user?.email}</p>
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
