import Empty from "../../../ui/Empty";
import Table from "../../../ui/Table";
import DonationDoneRow from "./DonationDoneRow";
import useDonations from "../useDonations";
import Loader from "../../../ui/Loader";
import { useSearchParams } from "react-router-dom";
import { compareIsoDates } from "../../../utils/helpers";

function DonationsDoneList() {
  const { donationList = [], loadingDonations } = useDonations("Donor");
  const [searchParams] = useSearchParams();
  if (loadingDonations) return <Loader />;

  const currFilter = searchParams.get("donationType") || "all";
  const sortby = searchParams.get("sortBy") || "createdAt_desc";
  let filterData = donationList;
  if (currFilter === "veg") {
    filterData = filterData.filter(
      (donation) => donation.type === "Food" && donation.foodType === "veg",
    );
  }
  if (currFilter === "non-veg") {
    filterData = filterData.filter(
      (donation) => donation.type === "Food" && donation.foodType === "non-veg",
    );
  }

  if (currFilter === "Money") {
    filterData = filterData.filter((donation) => donation.type === "Money");
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
      (a, b) =>
        a.organization[field].localeCompare(b.organization[field]) * modifier,
    );
  }

  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center">
      {sortedData.length === 0 ? (
        <Empty resource="donations" />
      ) : (
        <Table
          purpose="donations"
          headers={["Date", "Organization", "Message", "Donated", ""]}
          data={sortedData}
          render={(donation) => (
            <DonationDoneRow key={donation._id} donation={donation} />
          )}
        ></Table>
      )}
    </section>
  );
}

export default DonationsDoneList;
