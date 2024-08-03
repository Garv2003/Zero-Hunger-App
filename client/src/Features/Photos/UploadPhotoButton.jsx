import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import DragnUpload from "./DragnUpload";
import propTypes from "prop-types";

function UploadPhotoButton({ organization }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="uploadPhoto">
          <Button type="cancel" size="small">
            Upload Photo
          </Button>
        </Modal.Open>
        <Modal.Window name="uploadPhoto">
          <DragnUpload organization={organization} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UploadPhotoButton;
