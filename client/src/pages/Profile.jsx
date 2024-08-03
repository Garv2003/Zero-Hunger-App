import DonorProfile from "../Users/Donor/DonorProfile";
import OrganizationProfile from "../Users/Receiver/OrganizationProfile";
import { useAuthContext } from "../context/AuthProvider";

function Profile() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <section className="h-full w-full">
      {user.user.type === "Donor" ? (
        <DonorProfile />
      ) : (
        <OrganizationProfile active="organization" />
      )}
    </section>
  );
}

export default Profile;
