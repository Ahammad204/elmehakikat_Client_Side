import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";


const Login = () => {
  const navigate = useNavigate();
  const {signIn} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

 if (!email || !password) {
      console.log("Please fill all fields");
      return;
    }

    console.log(email);
    console.log(password)

    signIn(email, password)
      .then((result) => {
        navigate("/");
        
      })
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#b99543]">Login</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b99543]"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b99543]"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[#b99543] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#b99543] underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
