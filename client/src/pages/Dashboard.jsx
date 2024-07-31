import { useAuthContext } from "../context/AuthProvider";

function Dashboard() {
  const { user } = useAuthContext();
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div>
        <h3 className="font-mono text-xl font-bold uppercase text-stone-700">
          Dashboard
        </h3>
      </div>
    </div>
  );
}

export default Dashboard;
