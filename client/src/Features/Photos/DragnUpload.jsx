import { useForm, Controller } from "react-hook-form";
import PhotoDropZone from "./PhotoDropZone"; // Update the dropzone component
import Button from "../../ui/Button";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import useUploadPhoto from "./useUploadPhoto"; // Update the upload hook
import propTypes from "prop-types";
import Loader from "../../ui/Loader";

function DragnUpload({ closeModal, organization }) {
  const { handleSubmit, control, setValue } = useForm();
  const [fileName, setFileName] = useState("");
  const { user } = useAuthContext();

  const { uploadPhoto, isUploading } = useUploadPhoto(organization); // Update the upload function

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    uploadPhoto(
      { _id: user._id, image: data }, // Update the payload
      {
        onSuccess: () => closeModal(),
        onError: () => closeModal(),
      },
    );
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // Check for image types
      setValue("imageFile", file);
      setFileName(file.name);
    } else {
      console.error("File is not an accepted image type:", file);
    }
  };

  if (isUploading) return <Loader type={2} />;

  return (
    <div className="min-w-[30rem] p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="imageFile" // Update the form field name
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <PhotoDropZone
              onDrop={handleDrop}
              name={field.name}
              fileName={fileName}
            />
          )}
        />
        <Button purpose="submit" type="doctor" disabled={isUploading}>
          {" "}
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

DragnUpload.propTypes = {
  closeModal: propTypes.func.isRequired,
  organization: propTypes.object.isRequired,
};

export default DragnUpload;
