import Button from "../../ui/Button";
import { useAuthContext } from "../../context/AuthProvider";
import Modal from "../../ui/Modal";
import EditProfileForm from "./EditDonorProfileForm";
import useDonor from "./useDonor";
import Loader from "../../ui/Loader";

function DonorProfile() {
  const { user } = useAuthContext();
  // const { donor = {}, loadingDonor } = useDonor(user._id);
  // if (loadingDonor) return <Loader />;

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-stone-50 px-10 py-6 font-mono shadow-xl">
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center gap-4">
        <span className="text-lg font-medium">Name</span>
        {user.name ? (
          <span className="rounded-md border-2 bg-white px-4 py-2 text-sm font-medium shadow-md">
            {user.name}
          </span>
        ) : (
          <span className="p-2 text-stone-500">&mdash;</span>
        )}
      </div>
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center gap-4">
        <span className="text-lg font-medium text-stone-600">Email</span>
        <span className="rounded-md border-2 bg-white px-4 py-2 text-stone-600 shadow-md">
          {user.email}
        </span>
      </div>
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center gap-4">
        <span className="text-lg font-medium">Phone</span>
        {user.phone ? (
          <span className="rounded-md border-2 bg-white px-4 py-2 text-sm shadow-md">
            {user.phone}
          </span>
        ) : (
          <span className="p-2 text-stone-500">&mdash;</span>
        )}
      </div>
      <div className="grid max-w-[30rem] grid-cols-[100px_1fr] items-center gap-4">
        <span className="text-lg font-medium">Location</span>
        {user.location ? (
          <span className="rounded-md border-2 bg-white px-4 py-2 text-sm capitalize shadow-md">
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
