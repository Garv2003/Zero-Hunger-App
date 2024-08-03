import Empty from "../../ui/Empty";
import usePhotos from "./usePhotos";
import Loader from "../../ui/Loader";
import propTypes from "prop-types";

function PhotosList({ organization }) {
  const { photosList = [], loadingPhotos } = usePhotos(organization);
  if (photosList.length === 0) return <Empty resource="photos" />;

  return (
    <ul className="grid w-full grid-cols-3 gap-4">
      {loadingPhotos && <Loader type={2} />}
      {photosList.map((image) => (
        <li key={image._id}>
          <img src={image.url} alt="Organization" className="h-full w-full" />
        </li>
      ))}
    </ul>
  );
}

PhotosList.propTypes = {
  organization: propTypes.object.isRequired,
};

export default PhotosList;
