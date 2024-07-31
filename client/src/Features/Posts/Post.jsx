import DeleteButton from "../Donate/DonateButton";
import CreateDonateForm from "../Donate/CreateDonateForm";
import Modal from "../../ui/Modal";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoChatbox } from "react-icons/io5";
import propTypes from "prop-types";

function Post({ post }) {
  return (
    <li className="mx-auto flex h-[500px] max-w-[25rem] flex-col justify-between gap-2 rounded-lg border p-4 sm:w-full md:h-[400px] md:max-w-full md:flex-row">
      <div className="flex flex-col justify-between">
        <div>
          <Modal>
            <div>
              <h3 className="flex items-center justify-between">
                <Link
                  to={`/app/organizations/${post.author._id}`}
                  className="font-bold"
                >
                  {post.author.name}
                </Link>
              </h3>

              <div className="my-2 flex flex-col gap-2">
                <h1 className="font-mono text-lg font-semibold text-stone-700">
                  {post.title}
                </h1>
                <p className="text-base italic text-stone-500">
                  {post.description}
                </p>
              </div>
            </div>
            <div className="mb-4 flex gap-2">
              <Modal.Open opens="donateForm">
                <DeleteButton />
              </Modal.Open>

              <div>
                <button className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white shadow-md transition-all duration-100 hover:bg-red-600">
                  <IoChatbox />
                  Chat
                </button>
              </div>
            </div>
            <Modal.Window name="donateForm">
              <CreateDonateForm
                organization={{
                  name: post.author.name,
                  _id: post.author._id,
                }}
              />
            </Modal.Window>
          </Modal>
        </div>
        <div>
          <Link
            className="mt-auto flex items-center gap-2 font-semibold text-stone-600 hover:text-stone-500"
            to={`/app/organizations/${post.author._id}`}
          >
            <FaLocationArrow />
            Visit Organization
          </Link>
        </div>
      </div>
      <div className="relative h-full w-full max-w-[350px] overflow-auto bg-white">
        <img src={post.image} className="h-full w-full rounded-md" />
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
