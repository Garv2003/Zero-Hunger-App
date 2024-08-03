import { useAuthContext } from "../../context/AuthProvider";
import PhotosList from "./PhotosList";
import UploadPhotoButton from "./UploadPhotoButton";
import propTypes from "prop-types";

function Photos({ organization }) {
  const { user } = useAuthContext();
  console.log(organization);
  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        {user.user.type !== "Donor" && organization.email === user.email && (
          <UploadPhotoButton organization={organization} />
        )}
      </div>
      <PhotosList organization={organization} />
    </div>
  );
}

Photos.propTypes = {
  organization: propTypes.object.isRequired,
};

export default Photos;
