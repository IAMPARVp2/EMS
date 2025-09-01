import React from "react";
import { MailIcon, LockIcon, EyeIcon } from "./Icons";

function LoginFormInputs({
  activeTab,
  formik,
  showPassword,
  handlePasswordVisibility,
}) {
  return (
    <>
      {activeTab === "signUp" && (
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="input-with-icon">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-with-icon">
          <MailIcon />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-with-icon">
          <LockIcon />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <EyeIcon onClick={handlePasswordVisibility} />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
      </div>

      {activeTab === "signUp" && (
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="input-with-icon">
            <LockIcon />
            <input
              id="confirmpassword"
              name="confirmPassword"
              type="password"
              placeholder="Enter your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
          )}
        </div>
      )}
    </>
  );
}

export default LoginFormInputs;