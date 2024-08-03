import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect } from "react";
import useDashboard from "../Features/Dashboard/useDashboard";
import Loader from "../ui/Loader";
import { formatCurrencyInINR } from "../utils/helpers";
import Empty from "../ui/Empty";

function Dashboard() {
  const { dashboard = [], loadingDashboard } = useDashboard();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user.type === "Donor") {
      navigate("/home");
    }
  }, []);

  if (loadingDashboard) return <Loader />;

  if (dashboard.length === 0) return <Empty resources="Data" />;

  return user.user.type === "Donor" ? null : (
    <div className="flex h-full w-full flex-col gap-8">
      <div>
        <h3 className="font-mono text-xl font-bold uppercase text-stone-700">
          Dashboard
        </h3>
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-8 rounded-xl p-4 sm:grid-cols-2">
        {dashboard.map((field, index) => (
          <div
            key={index}
            className="flex h-[300px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-stone-50 shadow-lg"
          >
            <h2 className="text-2xl">{field.label}</h2>
            <p className="text-5xl font-bold">
              {field.label === "Total Money Donated"
                ? formatCurrencyInINR(field.value)
                : field.label === "Total Food Donated"
                  ? field.value + " Kgs"
                  : field.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
