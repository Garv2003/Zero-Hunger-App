import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import DragnUpload from "./DragnUpload";
function UploadPhotoButton({ id }) {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button type="cancel" size="small">
            Upload Photo
          </Button>
        </Modal.Open>
        <Modal.Window>
          <DragnUpload id={id} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UploadPhotoButton;
