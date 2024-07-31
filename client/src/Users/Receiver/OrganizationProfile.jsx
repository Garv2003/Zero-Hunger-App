import Organization from "../../Features/Organization/Organization";

function OrganizationProfile() {
  const active = "organization";
  return (
    <div>
      <Organization active={active} />
    </div>
  );
}

export default OrganizationProfile;
