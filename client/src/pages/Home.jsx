import PostList from "../Features/Posts/PostList";
import Button from "../ui/Button";
import { useAuthContext } from "../context/AuthProvider";
import CreatePost from "../Features/Posts/CreatePost";
import Modal from "../ui/Modal";

function Home() {
  const { user } = useAuthContext();

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <Modal>
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xl font-bold uppercase text-stone-700">
            Home
          </h3>
          {user.user.type === "Receiver" && (
            <Modal.Open opens="createPost">
              <Button type="cancel" size="small">
                Create Post
              </Button>
            </Modal.Open>
          )}
        </div>
        <div className="w-full">
          <PostList />
        </div>
        <Modal.Window name="createPost">
          <CreatePost />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Home;
