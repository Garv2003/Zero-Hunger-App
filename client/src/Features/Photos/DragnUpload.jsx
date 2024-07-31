import { useForm, Controller } from "react-hook-form";
import PhotoDropZone from "./PhotoDropZone"; // Update the dropzone component
import Button from "../../ui/Button";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import useUploadPhoto from "./useUploadPhoto"; // Update the upload hook

function DragnUpload({ closeModal, id }) {
  const { handleSubmit, control, setValue } = useForm();
  const [fileName, setFileName] = useState("");
  const { user } = useAuthContext();

  const { uploadPhoto, isUploading } = useUploadPhoto(id); // Update the upload function

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    uploadPhoto(
      { email: user.email, image: data }, // Update the payload
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
        <Button purpose="submit" type="patient" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default DragnUpload;
