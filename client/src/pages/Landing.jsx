import { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Landing() {
  const { user, setAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setAuthenticated(true);
      navigate("app");
    }
  });
  return (
    <div className="flex h-screen w-screen flex-col bg-red-500 text-white">
      <div className="flex items-center justify-end gap-4 p-4">
        <button>Login</button>
        <button>Signup</button>
      </div>
      <div className="mx-auto flex h-full w-full max-w-[40rem] flex-col items-center justify-center gap-4">
        <h1 className="bg-yellow-500 p-4 text-2xl font-bold text-black">
          Zero Hunger - Food Donation{" "}
        </h1>
        <p className="text-center text-xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, rem
          sequi ea porro dignissimos similique officiis quaerat laudantium
          architecto animi obcaecati, distinctio odit delectus laboriosam harum
          accusantium consequuntur necessitatibus fuga.
        </p>
        <Link
          to="/login"
          className="rounded-md border border-black p-3 text-black shadow-md transition-all duration-100 hover:border-none hover:bg-white"
        >
          Get Started &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Landing;
