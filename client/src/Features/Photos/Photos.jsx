import { useAuthContext } from "../../context/AuthProvider";
import PhotosList from "./PhotosList";
import UploadPhotoButton from "./UploadPhotoButton";
function Photos({ organisation }) {
  const { user } = useAuthContext();
  console.log(organisation, user.email);
  return (
    <div className="flex flex-col gap-2">
      <div>
        {user.user.type !== "Donor" && organisation.email === user.email && (
          <UploadPhotoButton id={organisation} />
        )}
      </div>
      <PhotosList />
    </div>
  );
}

export default Photos;
