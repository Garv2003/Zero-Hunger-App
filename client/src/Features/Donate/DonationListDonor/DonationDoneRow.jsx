import propTypes from "prop-types";
import { formatDate } from "../../../utils/date";
import { formatCurrencyInINR } from "../../../utils/helpers";
function DonationDoneRow({ donation }) {
  const { date, time } = formatDate(donation.createdAt);

  const timeUnit = time.split(":")[0] > 12 ? "PM" : "AM";
  const styleForFoodType = {
    veg: ` bg-green-500 text-xs font-bold py-2 px-4  w-fit  rounded-full text-white border-none  `,
    "non-veg": `rounded-full text-xs font-bold bg-red-500 w-fit text-white py-2 px-4 border-none`,
  };
  return (
    <div
      className={`grid w-full grid-cols-[0.8fr_1.2fr_2fr_0.8fr_0.8fr] gap-4 border p-4 text-sm text-stone-600`}
    >
      <div className="flex flex-col">
        <span>{date}</span>
        <span className="text-xs text-emerald-600">
          {time} {timeUnit}
        </span>
      </div>
      <div>{donation.organization.name} </div>
      {donation.message !== "-" ? (
        <div>{donation.message}</div>
      ) : (
        <span>&mdash;</span>
      )}
      <div>{donation.type}</div>
      <div>
        {donation.type === "Money" ? (
          <div className="text-center font-semibold">
            {formatCurrencyInINR(donation.amount)}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold">{donation.quantity} kg</span>
            <span className={styleForFoodType[donation.foodType]}>
              {donation.foodType}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

DonationDoneRow.propTypes = {
  donation: propTypes.object.isRequired,
};

export default DonationDoneRow;
