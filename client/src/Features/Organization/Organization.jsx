import { IoChatbox } from "react-icons/io5";
import DonateButton from "../Donate/DonateButton";
import Modal from "../../ui/Modal";
import CreateDonateForm from "../Donate/CreateDonateForm";

import Button from "../../ui/Button";
import { useState } from "react";
import FeedbackList from "../Feedbacks/FeedbackList";

import Photos from "../Photos/Photos";
import EditOrganizationProfileForm from "../../Users/Receiver/EditOrganizationProfileForm";
import useOrganizationById from "./useOrganizationById";
import { useParams } from "react-router-dom";
import PropsTypes from "prop-types";
import { useAuthContext } from "../../context/AuthProvider";

function Organization({ active }) {
  const { user } = useAuthContext();
  const { organizationId } = useParams();

  const { organization, loadingOrganization } = useOrganizationById(
    organizationId || user._id,
  );
  const [activeTab, setActiveTab] = useState("feedbacks");

  if (loadingOrganization) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="m-4 flex flex-col gap-10 sm:flex-row sm:gap-4">
        <div className="order-1 flex flex-col items-center gap-4 sm:items-start">
          <div className="flex flex-col gap-4">
            <h1 className="font-mono text-3xl font-semibold text-stone-700">
              {organization.name}
            </h1>
            <p className="flex flex-col items-end gap-1 text-sm italic text-stone-500">
              <span>{active ? "abc@test.com" : organization?.email}</span>
              <span>{organization?.phone}</span>
              <span>{organization?.location}</span>
            </p>
          </div>
          <p className="mt-4 bg-stone-50 p-4 text-sm text-stone-700">
            {organization.description}
          </p>
          <div className="flex items-center gap-4">
            {!active && (
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

        <div className="mx-auto h-[300px] w-full sm:order-2 sm:w-[20rem]">
          <img src={organization.image} className="h-full w-full rounded-md" />
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
            <FeedbackList organization={{ email: organization.email }} />
          ) : (
            <Photos
              organization={{
                id: organization._id,
                email: active ? "abc@test.com" : organization.email,
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
