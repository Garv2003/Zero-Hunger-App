import { useAuthContext } from "../context/AuthProvider";
import DonationsDoneList from "../Features/Donate/DonationListDonor/DonationDoneList";
import DonationsReceivedList from "../Features/Donate/DonationListOrganization/DonationReceivedList";
import Filter from "../ui/Filter";
import { useMemo } from "react";
import SortBy from "../ui/SortBy";
function Donations() {
  const { user } = useAuthContext();
  const sortList = useMemo(() => {
    if (user.user.type === "Receiver") {
      return [
        {
          field: "Sort by date(recent first)",
          value: "createdAt_desc",
        },
        {
          field: "Sort by date(earliest first)",
          value: "createdAt_asc",
        },
        {
          field: "Sort by donor(A-Z)",
          value: "email_asc",
        },
        {
          field: "Sort by donor(Z-A)",
          value: "email_desc",
        },
      ];
    } else {
      return [
        {
          field: "Sort by date(recent first)",
          value: "createdAt_desc",
        },
        {
          field: "Sort by date(earliest first)",
          value: "createdAt_asc",
        },
        {
          field: "Sort by organisation(A-Z)",
          value: "name_asc",
        },
        {
          field: "Sort by organisation(Z-A)",
          value: "name_desc",
        },
      ];
    }
  }, [user.user.type]);

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full flex-col items-center gap-4 sm:items-start">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <h3 className="font-sans text-2xl font-bold text-stone-700">
            {user.user.type === "Donor"
              ? "Donations Done"
              : "Donations Received"}
          </h3>
          <SortBy options={sortList} />
        </div>
        <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-between">
          <Filter
            filterField="donationType"
            options={[
              { field: "All", value: "all" },
              { field: "Veg Food", value: "veg" },
              {
                field: "Non-Veg Food",
                value: "non-veg",
              },
              { field: "Money", value: "Money" },
            ]}
          />
          {user.user.type === "Receiver" && (
            <Filter
              filterField="donorType"
              options={[
                { field: "All", value: "all" },
                { field: "Individual", value: "Individual" },
                {
                  field: "Business",
                  value: "Business",
                },
                { field: "Local Restaurant", value: "LocalRestaurant" },
              ]}
            />
          )}
        </div>
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
