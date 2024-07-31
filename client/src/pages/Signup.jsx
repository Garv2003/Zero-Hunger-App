import { useState } from "react";
import RegisterDonor from "../Users/Donor/RegisterDonor";
import RegisterReceiver from "../Users/Receiver/RegisterReceiver";

function SignUp() {
  const [userType, setUserType] = useState("donor");

  function handleClick(thing) {
    setUserType(thing);
  }
  return (
    <section className="flex h-full min-h-screen w-screen flex-col items-center justify-center gap-1">
      <div className="flex justify-center">
        <div className="flex justify-center gap-2 rounded-lg p-1 shadow-md">
          <button
            className="rounded-md px-4 py-2 font-semibold text-stone-600 disabled:bg-red-500 disabled:text-white"
            onClick={() => handleClick("donor")}
            disabled={userType === "donor"}
          >
            Donor
          </button>
          <button
            className="rounded-md px-4 py-2 font-semibold text-stone-600 disabled:bg-red-500 disabled:text-white"
            onClick={() => handleClick("organization")}
            disabled={userType === "organization"}
          >
            Organization
          </button>
        </div>
      </div>
      <div className="h-full w-full bg-white">
        {userType === "donor" ? <RegisterDonor /> : <RegisterReceiver />}
      </div>
    </section>
  );
}

export default SignUp;
