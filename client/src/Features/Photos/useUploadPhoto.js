import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUploadPhoto({ id }) {
  const queryClient = useQueryClient();
  const { mutate: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: (d) => console.log(d),
    onSuccess: () => {
      toast.success("PDF Uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: ["photos", id],
      });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to upload pdf");
    },
  });
  return { uploadPhoto, isUploading };
}

export default useUploadPhoto;
