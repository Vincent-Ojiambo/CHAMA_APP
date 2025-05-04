// import React from "react"; // Import React

// function LoginPage({ onLogin }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md">
//         <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
//           <div className="flex flex-col items-center mb-6">
//             <div className="bg-green-600 rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold mb-4">
//               CP
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">ChamaPlus</h2>
//             <p className="text-gray-600 mt-1">
//               Digitizing Informal Savings Groups
//             </p>
//           </div>

//           <form onSubmit={onLogin}>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="email"
//               >
//                 Email/Phone
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="email"
//                 type="text"
//                 placeholder="Enter your email or phone"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 type="password"
//                 placeholder="******************"
//               />
//             </div>
//             <div className="flex items-center justify-center">
//               <button
//                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                 type="submit"
//               >
//                 LOGIN
//               </button>
//             </div>
//           </form>

//           <p className="text-center text-gray-600 text-sm mt-6">
//             Don't have an account?{" "}
//             <a className="text-green-600 hover:text-green-800" href="#">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React from "react";

interface LoginPageProps {
  onLogin: (event: React.FormEvent) => void;
  logoUrl?: string; // Added logoUrl prop
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  logoUrl = "/logo512.png",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center mb-6">
            {/* Use img tag for logo */}
            <img
              src={logoUrl}
              alt="ChamaPlus Logo"
              className="rounded-full h-16 w-16 mb-4" // added classes for size
            />
            <h2 className="text-2xl font-bold text-gray-800">ChamaPlus</h2>
            <p className="text-gray-600 mt-1 text-center">
              Digitizing Informal Savings Groups
            </p>
          </div>

          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email/Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                name="email"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
              />
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              LOGIN
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <a className="text-green-600 hover:text-green-800" href="/register">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
