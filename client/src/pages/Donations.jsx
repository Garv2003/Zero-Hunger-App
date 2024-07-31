import { useAuthContext } from "../context/AuthProvider";
import DonationsDoneList from "../Features/Donate/DonationListDonor/DonationDoneList";
import DonationsReceivedList from "../Features/Donate/DonationListOrganization/DonationReceivedList";

function Donations() {
  const { user } = useAuthContext();
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div>
        <h3 className="font-mono text-xl font-bold uppercase text-stone-700">
          Donations Done
        </h3>
      </div>
      {user.user.type === "Donor" ? (
        <DonationsDoneList />
      ) : (
        <DonationsReceivedList />
      )}
    </div>
  );
}

export default Donations;
