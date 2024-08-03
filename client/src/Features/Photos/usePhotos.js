import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "../../services/apiPhotos";

function usePhotos(organization) {
  const { data: photosList, isPending: loadingPhotos } = useQuery({
    queryKey: ["photos", organization._id],
    queryFn: () => {
      return getPhotos(organization._id);
    },
  });
  return { photosList, loadingPhotos };
}

export default usePhotos;
