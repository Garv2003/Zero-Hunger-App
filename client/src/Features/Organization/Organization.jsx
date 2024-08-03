import { IoChatbox } from "react-icons/io5";
import DonateButton from "../Donate/DonateButton";
import Modal from "../../ui/Modal";
import CreateDonateForm from "../Donate/CreateDonateForm";

import Button from "../../ui/Button";
import { useState } from "react";
import Feedbacks from "../Feedbacks/Feedbacks";

import Photos from "../Photos/Photos";
import EditOrganizationProfileForm from "../../Users/Receiver/EditOrganizationProfileForm";
import useOrganizationById from "./useOrganizationById";
import { useParams } from "react-router-dom";
import PropsTypes from "prop-types";
import { useAuthContext } from "../../context/AuthProvider";
import Loader from "../../ui/Loader";
import Organizations from "../../pages/Organizations";

function Organization({ active }) {
  const { user } = useAuthContext();
  const { organizationId } = useParams();

  const { organization, loadingOrganization } = useOrganizationById(
    organizationId || user._id,
  );

  const [activeTab, setActiveTab] = useState("feedbacks");

  if (loadingOrganization) {
    return <Loader />;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-10 mt-4 flex w-full flex-col gap-10 rounded-lg border px-4 py-4 shadow-lg sm:flex-row sm:justify-around sm:gap-4">
        <div className="order-2 flex w-fit flex-col items-center gap-4 p-4 sm:items-start">
          <div className="flex w-full flex-col gap-4">
            <h1 className="font-serif text-3xl font-semibold text-stone-700">
              {organization.name}
            </h1>
            <p className="flex flex-col">
              <div className="grid grid-cols-[100px_1fr]">
                <span className="text-lg font-medium text-stone-600">
                  Email
                </span>
                <span>{organization?.email}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr]">
                <span className="font-medium text-stone-600">Phone</span>
                {organization?.phone ? (
                  <span>{organization?.phone}</span>
                ) : (
                  <span>&mdash;</span>
                )}
              </div>
              <div className="grid grid-cols-[100px_1fr]">
                <span className="font-medium text-stone-600">Location</span>
                {organization?.location ? (
                  <span>{organization?.location}</span>
                ) : (
                  <span>&mdash;</span>
                )}
              </div>
            </p>
          </div>
          <div className="max-w-full">
            {organization.description && (
              <p className="mb-4 max-w-full rounded-md bg-red-50 p-4 text-sm text-stone-700 shadow-md">
                {organization.description}
              </p>
            )}
          </div>
          <div className="flex w-full items-start gap-4">
            {!active && user.user.type === "Donor" && (
              <button className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white shadow-md transition-all duration-100 hover:bg-red-600">
                <IoChatbox />
                Chat
              </button>
            )}
            <Modal>
              <Modal.Open opens="donateForm">
                <DonateButton />
              </Modal.Open>

              {active && (
                <Modal.Open opens="editOrganization">
                  <Button type="doctor" size="small">
                    Edit
                  </Button>
                </Modal.Open>
              )}
              <Modal.Window name="editOrganization">
                <EditOrganizationProfileForm organization={organization} />
              </Modal.Window>
              <Modal.Window name="donateForm">
                <CreateDonateForm organization={organization} />
              </Modal.Window>
            </Modal>
          </div>
        </div>

        <div className="order-1 mx-auto w-60 sm:mx-0 sm:w-[500px]">
          <img
            src={organization.image}
            className="h-full w-full rounded-md object-contain"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <nav className="flex items-center justify-center gap-2 rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab("feedbacks")}
            className={`${activeTab === "feedbacks" ? "bg-red-500 text-white" : "hover:bg-red-200"} rounded-md px-4 py-2`}
          >
            Feedbacks
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`${activeTab === "photos" ? "bg-red-500 text-white" : "hover:bg-red-200"} rounded-md px-4 py-2`}
          >
            Photos
          </button>
        </nav>
      </div>
      <div className="py-5">
        <div className="flex flex-col gap-4">
          {activeTab === "feedbacks" ? (
            <Feedbacks
              organization={{
                _id: organization._id,
                email: organization.email,
              }}
            />
          ) : (
            <Photos
              organization={{
                _id: organization._id,
                email: organization.email,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Organization.propTypes = {
  active: PropsTypes.bool,
};

export default Organization;
