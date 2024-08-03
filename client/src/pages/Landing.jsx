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
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <div className="mx-auto flex h-full w-full max-w-[40rem] flex-col items-center justify-center gap-4">
        <h1 className="bg-yellow-500 p-4 text-2xl font-bold text-black">
          Zero Hunger - Food Donation{" "}
        </h1>
        <p className="text-center text-xl font-semibold">
          The Zero Hunger - Food Donation project aims to create a platform that
          connects individuals, businesses, and organizations with surplus food
          to those in need. This platform will streamline the process of food
          donation, ensuring that excess food reaches communities and
          individuals facing food insecurity. By leveraging technology, the
          project will facilitate efficient and effective food redistribution,
          reducing food waste and addressing hunger.
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
