import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addPhoto } from "../../services/apiPhotos";

function useUploadPhoto(organization) {
  const queryClient = useQueryClient();

  const { mutate: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: (image) => addPhoto({ image: image }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["photos", organization._id],
      });
      toast.success("Photo uploaded successfully");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to upload photo");
    },
  });
  return { uploadPhoto, isUploading };
}

export default useUploadPhoto;
