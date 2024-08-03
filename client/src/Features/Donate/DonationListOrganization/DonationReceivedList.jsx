import Empty from "../../../ui/Empty";
import Table from "../../../ui/Table";
import DonationReceivedRow from "./DonationReceivedRow";
import useDonations from "../useDonations";
import Loader from "../../../ui/Loader";
import { useSearchParams } from "react-router-dom";
import { compareIsoDates } from "../../../utils/helpers";
function DonationsReceivedList() {
  const { donationList = [], loadingDonations } = useDonations("Receiver");
  const [searchParams] = useSearchParams();
  if (loadingDonations) return <Loader />;

  const currFilter1 = searchParams.get("donationType") || "all";
  const currFilter2 = searchParams.get("donorType") || "all";
  const sortby = searchParams.get("sortBy") || "createdAt_desc";
  let filterData = donationList;
  if (currFilter1 === "veg") {
    filterData = filterData.filter(
      (donation) => donation.type === "Food" && donation.foodType === "veg",
    );
  }
  if (currFilter1 === "non-veg") {
    filterData = filterData.filter(
      (donation) => donation.type === "Food" && donation.foodType === "non-veg",
    );
  }

  if (currFilter1 === "Money") {
    filterData = filterData.filter((donation) => donation.type === "Money");
  }

  if (currFilter2 !== "all") {
    filterData = filterData.filter(
      (donation) => donation.donor.user.category === currFilter2,
    );
  }
  let [field, direction] = sortby.split("_");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedData = filterData;
  if (field === "createdAt") {
    sortedData = sortedData.sort(
      (a, b) => modifier * compareIsoDates(a[field], b[field]),
    );
  } else {
    sortedData = sortedData.sort(
      (a, b) => a.donor[field].localeCompare(b.donor[field]) * modifier,
    );
  }
  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center">
      {sortedData.length === 0 ? (
        <Empty resource="donations" />
      ) : (
        <Table
          purpose="donations"
          headers={["Date", "Donor", "Message", "Donated", ""]}
          data={sortedData}
          render={(donation) => (
            <DonationReceivedRow key={donation._id} donation={donation} />
          )}
        ></Table>
      )}
    </section>
  );
}

export default DonationsReceivedList;
