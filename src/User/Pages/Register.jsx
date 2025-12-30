


// import React, { useState } from "react";
// import { registerAPI } from "../../Service/allAPI";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Register = () => {
//     const [userDetails, setUserDetails] = useState({
//         name: "",
//         username: "",
//         email: "",
//         password: "",
//     });

//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         const { name, username, email, password } = userDetails;

//         if (!name || !username || !email || !password) {
//              toast.error("Fill all the fields");
//             return;
//         }

//         try {
//             const result = await registerAPI({ name, username, email, password });
//             console.log(result);

//             if (result.status === 201) {
//                 toast.success("Registered Successfully");
//                 setUserDetails({ name: "", username: "", email: "", password: "" });
//                 navigate("/login");
//             } else if (result.status === 409) {
//                  toast.error(result.response?.data?.message || "User already exists");
//             } else {
//                  toast.error(result.response?.data?.message || "Something went wrong");
//             }
//         } catch (error) {
//             console.error(error);
//             alert(error.response?.data?.message || "Server error");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-emerald-50">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//                 <form className="space-y-4" onSubmit={handleRegister}>
//                     <div>
//                         <label>Name</label>
//                         <input
//                             value={userDetails.name}
//                             onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
//                             type="text"
//                             className="w-full border px-3 py-2 rounded"
//                         />
//                     </div>

//                     <div>
//                         <label>Username</label>
//                         <input
//                             value={userDetails.username}
//                             onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
//                             type="text"
//                             className="w-full border px-3 py-2 rounded"
//                         />
//                     </div>

//                     <div>
//                         <label>Email</label>
//                         <input
//                             value={userDetails.email}
//                             onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
//                             type="email"
//                             className="w-full border px-3 py-2 rounded"
//                         />
//                     </div>

//                     <div>
//                         <label>Password</label>
//                         <input
//                             value={userDetails.password}
//                             onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
//                             type="password"
//                             className="w-full border px-3 py-2 rounded"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
//                     >
//                         Register
//                     </button>
//                 </form>

//                 <p className="mt-4 text-center text-gray-600">
//                     Already have an account?{" "}
//                     <a href="/login" className="text-green-600 hover:underline">Login</a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;


import React, { useState } from "react";
import { registerAPI } from "../../Service/allAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, username, email, password } = userDetails;

    // validation
    if (!name || !username || !email || !password) {
      toast.error("Fill all the fields");
      return;
    }

    try {
      const result = await registerAPI({
        name,
        username,
        email,
        password,
      });

      console.log(result);

      if (result.status === 201) {
        toast.success("Registered Successfully ");
        setUserDetails({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else if (result.status === 409) {
        toast.error(result.response?.data?.message || "User already exists");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
