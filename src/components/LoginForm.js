import React, { useState } from "react";
import { useFormik } from "formik";
import { GoogleIcon, AppleIcon } from "./Icons";
import TabSwitcher from "./TabSwitcher";
import LoginFormInputs from "./LoginFormInputs";
import Separator from "./Separator";

function LoginForm() {
  const [activeTab, setActiveTab] = useState("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validate: (values) => {
      const errors = {};
      if (activeTab === "signUp" && !values.name) {
        errors.name = "Name required";
      }
      if (!values.email) errors.email = "Email required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email";
      }
      if (!values.password) errors.password = "Password required";
      else if (values.password.length < 6)
        errors.password = "Minimum 6 characters";
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
      setLoading(true);
      setSubmitting(true);
      try {
        const endpoint =
          activeTab === "signIn" ? "/api/auth/login" : "/api/auth/register";
        const method = "POST";
        const res = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (data.errors) setErrors(data.errors);
          else if (data.message) setErrors({ password: data.message });
          else setErrors({ password: "Server error" });
        } else {
          alert(
            `${
              activeTab === "signIn" ? "Signed in" : "Registered"
            } successfully`
          );
          resetForm();
        }
      } catch (err) {
        console.error(err);
        setErrors({ password: "Network error" });
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "GET" });
      if (res.ok) alert("Signed out");
      else alert("Sign out failed");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="auth-card">
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="form-container">
        <h3>
          {activeTab === "signIn"
            ? "Sign in to your account"
            : "Create a new account"}
        </h3>
        <p className="form-intro">
          {activeTab === "signIn"
            ? "Enter your email and password to access your account"
            : "Get started by creating your account"}
        </p>

        <form onSubmit={formik.handleSubmit} noValidate>
          <LoginFormInputs
            activeTab={activeTab}
            formik={formik}
            showPassword={showPassword}
            handlePasswordVisibility={handlePasswordVisibility}
          />

          {activeTab === "signIn" && (
            <div className="form-options">
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={formik.isSubmitting || loading}
          >
            {loading
              ? "Please wait..."
              : activeTab === "signIn"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: 10 }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleSignOut}
          >
            Sign Out (demo GET)
          </button>
        </div>

        <Separator />

        <div className="social-logins">
          <button className="btn-social" type="button">
            <GoogleIcon />
            <span>Google</span>
          </button>
          <button className="btn-social" type="button">
            <AppleIcon />
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;















// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { MailIcon, LockIcon, EyeIcon, GoogleIcon, AppleIcon } from "./Icons";

// function LoginForm() {
//   const [activeTab, setActiveTab] = useState("signIn"); // choose api routes based on this
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // const [confirmPassword, setConfirmPassword] = useState('');
//   // const [confirmError, setConfirmError] = useState('');

//   const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

//   // Formik handles form state/validation for both sign-in and sign-up
//   const formik = useFormik({
//     initialValues: { name: "", email: "", password: "", confirmPassword: "" },
//     validate: (values) => {
//       const errors = {};
//       if (activeTab === "signUp" && !values.name) {
//         errors.name = "Name required";
//       }

//       if (!values.email) errors.email = "Email required";
//       else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = "Invalid email";
//       }

//       if (!values.password) errors.password = "Password required";
//       else if (values.password.length < 6)
//         errors.password = "Minimum 6 characters";

//       if (!values.confirmPassword) {
//         errors.confirmPassword = "Confirm password is required";
//       } else if (values.confirmPassword !== values.password) {
//         errors.confirmPassword = "Passwords must match";
//       }
//       return errors;
//     },
//     onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
//       setLoading(true);
//       setSubmitting(true);
//       try {
//         // pick endpoint by tab
//         const endpoint =
//           activeTab === "signIn" ? "/api/auth/login" : "/api/auth/register";
//         const method = "POST";

//         const res = await fetch(endpoint, {
//           method,
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(values),
//         });

//         const data = await res.json().catch(() => ({}));

//         if (!res.ok) {
//           // map server validation to formik if supplied
//           if (data.errors) setErrors(data.errors);
//           else if (data.message) setErrors({ password: data.message });
//           else setErrors({ password: "Server error" });
//         } else {
//           // success handling (token storage / redirect as needed)
//           alert(
//             `${
//               activeTab === "signIn" ? "Signed in" : "Registered"
//             } successfully`
//           );
//           resetForm();
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ password: "Network error" });
//       } finally {
//         setLoading(false);
//         setSubmitting(false);
//       }
//     },
//   });

//   // Example GET for sign out (demo)
//   const handleSignOut = async () => {
//     try {
//       const res = await fetch("/api/auth/logout", { method: "GET" });
//       if (res.ok) alert("Signed out");
//       else alert("Sign out failed");
//     } catch (err) {
//       console.error(err);
//       alert("Network error");
//     }
//   };

  
//   return (
//     <div className="auth-card">
//       <div className="tab-switcher">
//         <button
//           className={`tab-btn ${activeTab === "signIn" ? "active" : ""}`}
//           onClick={() => setActiveTab("signIn")}
//           type="button"
//         >
//           Sign In
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "signUp" ? "active" : ""}`}
//           onClick={() => setActiveTab("signUp")}
//           type="button"
//         >
//           Sign Up
//         </button>
//       </div>

//       <div className="form-container">
//         <h3>
//           {activeTab === "signIn"
//             ? "Sign in to your account"
//             : "Create a new account"}
//         </h3>
//         <p className="form-intro">
//           {activeTab === "signIn"
//             ? "Enter your email and password to access your account"
//             : "Get started by creating your account"}
//         </p>

//         <form onSubmit={formik.handleSubmit} noValidate>
//           {activeTab === "signUp" && (
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <div className="input-with-icon">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="John Doe"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   required
//                 />
//               </div>
//               {formik.touched.name && formik.errors.name && (
//                 <div style={{ color: "red" }}>{formik.errors.name}</div>
//               )}
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <div className="input-with-icon">
//               <MailIcon />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 required
//               />
//             </div>
//             {formik.touched.email && formik.errors.email && (
//               <div style={{ color: "red" }}>{formik.errors.email}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-with-icon">
//               <LockIcon />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 required
//               />
//               <EyeIcon onClick={handlePasswordVisibility} />
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <div style={{ color: "red" }}>{formik.errors.password}</div>
//             )}
//           </div>

//           {activeTab === "signUp" && (
//             <div className="form-group">
//               <label htmlFor="confirmpassword">Confirm Password</label>
//               <div className="input-with-icon">
//                 <LockIcon />
//                 <input
//                   id="password"
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={formik.values.confirmPassword}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   required
//                 />
//               </div>
//               {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                 <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
//               )}
//             </div>
//           )}

//           {activeTab === "signIn" && (
//             <div className="form-options">
//               <a href="#" className="forgot-password">
//                 Forgot password?
//               </a>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="btn btn-primary btn-full"
//             disabled={formik.isSubmitting || loading}
//           >
//             {loading
//               ? "Please wait..."
//               : activeTab === "signIn"
//               ? "Sign In"
//               : "Sign Up"}
//           </button>
//         </form>

//         <div style={{ marginTop: 10 }}>
//           <button
//             type="button"
//             className="btn btn-ghost"
//             onClick={handleSignOut}
//           >
//             Sign Out (demo GET)
//           </button>
//         </div>

//         <div className="separator">
//           <span>OR CONTINUE WITH</span>
//         </div>

//         <div className="social-logins">
//           <button className="btn-social" type="button">
//             <GoogleIcon />
//             <span>Google</span>
//           </button>
//           <button className="btn-social" type="button">
//             <AppleIcon />
//             <span>Apple</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
