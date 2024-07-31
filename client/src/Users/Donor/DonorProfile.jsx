import Button from "../../ui/Button";
import { useAuthContext } from "../../context/AuthProvider";
import Modal from "../../ui/Modal";
import EditProfileForm from "./EditDonorProfileForm";

function DonorProfile() {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-stone-50 p-8 shadow-lg">
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center">
        <span className="text-lg font-semibold text-stone-600">Name</span>
        <span className="bg-white p-2 font-medium shadow-md">
          {user.name || "Name"}
        </span>
      </div>
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center">
        <span className="text-lg font-semibold text-stone-600">Email</span>
        <span className="rounded-sm bg-white p-2 font-medium text-stone-600 shadow-md">
          {" "}
          {user.email}
        </span>
      </div>
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center">
        <span className="text-lg font-semibold text-stone-600">Phone</span>
        {user.phone ? (
          <span className="bg-white p-2 font-medium">{user.phone}</span>
        ) : (
          <span className="p-2 text-stone-500">&mdash;</span>
        )}
      </div>
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center">
        <span className="text-lg font-semibold text-stone-600">Location</span>
        {user.location ? (
          <span className="rounded-md bg-white p-2 text-base font-medium text-stone-600 shadow-md">
            {user.location}
          </span>
        ) : (
          <span className="p-2 text-stone-500">&mdash;</span>
        )}
      </div>
      <div className="flex justify-end">
        <Modal>
          <Modal.Open opens="editProfile">
            <Button type="doctor">Edit</Button>
          </Modal.Open>
          <Modal.Window name="editProfile">
            <EditProfileForm />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default DonorProfile;
