import propTypes from "prop-types";

function DonationDoneRow({ donation }) {
  return (
    <div
      className={`grid w-full grid-cols-[0.8fr_1fr_2fr_1fr_0.8fr] gap-4 border p-4 text-sm text-stone-600`}
    >
      <div>{donation.createdAt}</div>
      <div>{donation.organization.name} </div>
      <div>{donation.message}</div>
      <div>{donation.type}</div>
      <div>
        {donation.type === "Money" ? "$" : ""} {donation.amount}
        {donation.quantity} {donation.type === "Money" ? "" : "Kg"}
      </div>
    </div>
  );
}

DonationDoneRow.propTypes = {
  donation: propTypes.object.isRequired,
};

export default DonationDoneRow;
