import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "../../services/apiPhotos";

function usePhotos(id) {
  const { data: photosList, isPending: loadingPhotos } = useQuery({
    queryKey: ["photos", id],
    queryFn: () => {
      //   getPhotos(id);
      //handle fetch donations
      return [];
    },
  });
  return { photosList, loadingPhotos };
}

export default usePhotos;
