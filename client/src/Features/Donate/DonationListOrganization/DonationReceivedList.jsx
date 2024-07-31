import Empty from "../../../ui/Empty";
import Table from "../../../ui/Table";
import DonationReceivedRow from "./DonationReceivedRow";
import useDonations from "../useDonations";

function DonationsReceivedList() {
  const { donationList = [], loadingDonations } = useDonations();

  // const donationList = [
  //   {
  //     id: 1,
  //     organisation: "Food Bank",
  //     donateType: "food",
  //     amountQuantity: "50kg",
  //     date: "2023-07-20",
  //     message: "Helping those in need with essential food supplies.",
  //   },
  //   {
  //     id: 2,
  //     organisation: "Charity Trust",
  //     donateType: "money",
  //     amountQuantity: "$200",
  //     date: "2023-07-22",
  //     message: "Contributing to various community programs.",
  //   },
  //   {
  //     id: 3,
  //     organisation: "Community Kitchen",
  //     donateType: "food",
  //     amountQuantity: "100kg",
  //     date: "2023-07-25",
  //     message: "Supporting local kitchens with food donations.",
  //   },
  //   {
  //     id: 4,
  //     organisation: "Helping Hands",
  //     donateType: "money",
  //     amountQuantity: "$150",
  //     date: "2023-07-28",
  //     message: "Providing financial aid for emergency assistance.",
  //   },
  //   {
  //     id: 5,
  //     organisation: "Local Shelter",
  //     donateType: "food",
  //     amountQuantity: "75kg",
  //     date: "2023-07-30",
  //     message: "Ensuring food security for shelter residents.",
  //   },
  // ];

  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center">
      {donationList.length === 0 ? (
        <Empty resource="donations" />
      ) : (
        <Table
          purpose="donations"
          headers={["Date", "Donor", "Message", "Donated", ""]}
          data={donationList}
          render={(donation) => (
            <DonationReceivedRow key={donation._id} donation={donation} />
          )}
        ></Table>
      )}
    </section>
  );
}

export default DonationsReceivedList;
