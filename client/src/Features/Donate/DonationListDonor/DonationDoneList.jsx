import Empty from "../../../ui/Empty";
import Table from "../../../ui/Table";
import DonationDoneRow from "./DonationDoneRow";
import useDonations from "../useDonations";

function DonationsDoneList() {
  const { donationList = [], loadingDonations } = useDonations("Donor");

  // const donationList = [
  //   {
  //     _id: 1,
  //     organisation: "Food Bank",
  //     donateType: "food",
  //     amountQuantity: "50kg",
  //     date: "2023-07-20",
  //     message: "Helping those in need with essential food supplies.",
  //   },
  //   {
  //     _id: 2,
  //     organisation: "Charity Trust",
  //     donateType: "money",
  //     amountQuantity: "$200",
  //     date: "2023-07-22",
  //     message: "Contributing to various community programs.",
  //   },
  //   {
  //     _id: 3,
  //     organisation: "Community Kitchen",
  //     donateType: "food",
  //     amountQuantity: "100kg",
  //     date: "2023-07-25",
  //     message: "Supporting local kitchens with food donations.",
  //   },
  //   {
  //     _id: 4,
  //     organisation: "Helping Hands",
  //     donateType: "money",
  //     amountQuantity: "$150",
  //     date: "2023-07-28",
  //     message: "Providing financial aid for emergency assistance.",
  //   },
  //   {
  //     _id: 5,
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
          headers={["Date", "Organization", "Message", "Type", "Amount"]}
          data={donationList}
          render={(donation) => (
            <DonationDoneRow key={donation._id} donation={donation} />
          )}
        ></Table>
      )}
    </section>
  );
}

export default DonationsDoneList;
