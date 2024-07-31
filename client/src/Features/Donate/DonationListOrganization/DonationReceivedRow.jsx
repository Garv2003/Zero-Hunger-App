import propTypes from "prop-types";

function DonationReceivedRow({ donation }) {
  return (
    <div
      className={`grid w-full grid-cols-[0.8fr_1fr_2fr_1fr_0.8fr] gap-4 border p-4 text-sm text-stone-600`}
    >
      <div>{donation.date}</div>
      <div>{donation.organization} </div>
      <div>{donation.message}</div>
      <div>{donation.donateType}</div>
      <div>{donation.amountQuantity}</div>
    </div>
  );
}

DonationReceivedRow.propTypes = {
  donation: propTypes.object.isRequired,
};

export default DonationReceivedRow;
