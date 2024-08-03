import DeleteButton from "../Donate/DonateButton";
import CreateDonateForm from "../Donate/CreateDonateForm";
import Modal from "../../ui/Modal";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoChatbox } from "react-icons/io5";
import propTypes from "prop-types";
import { useAuthContext } from "../../context/AuthProvider";

function Post({ post }) {
  const { user } = useAuthContext();
  return (
    <li className="mx-auto flex max-w-[25rem] flex-col items-center justify-between gap-4 rounded-lg border p-4 shadow-lg sm:w-full md:max-w-full md:flex-row">
      <div className="order-2 flex w-full flex-col justify-between md:order-1">
        <Modal>
          <div className="w-full p-4">
            <div className="flex flex-col gap-2 sm:gap-4">
              <h3 className="flex items-center justify-between font-mono text-2xl text-stone-400 sm:text-3xl">
                <Link
                  to={`/app/organizations/${post.author._id}`}
                  className="font-bold"
                >
                  {post.author.name}
                </Link>
              </h3>

              <div className="flex flex-col gap-2 rounded-md bg-red-50 p-2 shadow-md sm:my-2">
                <h1 className="font-serif text-xl font-semibold text-stone-700">
                  {post.title}
                </h1>
                <p className="overflow-auto font-serif text-sm text-stone-500 sm:text-base">
                  {post.description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between p-4">
            <div className="mb-8 flex gap-2">
              <Modal.Open opens="donateForm">
                <DeleteButton />
              </Modal.Open>

              {user.user.type === "Donor" && (
                <div>
                  <Link
                    to={`/app/messages/with/${post.author._id}`}
                    className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white shadow-md transition-all duration-100 hover:bg-red-600"
                  >
                    <IoChatbox />
                    Chat
                  </Link>
                </div>
              )}
            </div>
            <Modal.Window name="donateForm">
              <CreateDonateForm
                organization={{
                  name: post.author.name,
                  _id: post.author._id,
                }}
              />
            </Modal.Window>

            <Link
              className="mt-auto flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-500 sm:text-base"
              to={`/app/organizations/${post.author._id}`}
            >
              <FaLocationArrow />
              Visit Organization
            </Link>
          </div>
        </Modal>
      </div>
      <div className="relative order-1 h-full w-60 overflow-auto bg-white md:order-2 md:w-[500px]">
        <img
          src={post.image}
          className="h-full w-full rounded-md object-contain"
        />
      </div>
    </li>
  );
}

Post.propTypes = {
  post: propTypes.shape({
    image: propTypes.string.isRequired,
    author: propTypes.shape({
      _id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }).isRequired,
    description: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
  }).isRequired,
};

export default Post;
