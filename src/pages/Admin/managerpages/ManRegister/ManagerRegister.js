//MANAGER Register PAGE
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input/input";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useauth";
import styles from "../ManRegister/manregister.module.css";

export default function ManagerRegister() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnurl = params.get("returnurl");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    if (!user) return;
    returnurl
      ? navigate(returnurl)
      : navigate("/ManagerMainPage/managerregister");
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    setError,
  } = useForm();

  const submit = async (data) => {
    try {
      // Send the registration data including the PIN to the server
      const response = await auth.register(data);

      if (response.isAdmin) {
        navigate("/ManagerMainPage/dashboard");
      } else {
        setPinError(
          "Registration successful, but you are not registered as an admin."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPinError("Incorrect PIN. Please try again.");

        setPinError("An error occurred during registration. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.authformcontainer}>
        <link
          href="https://fonts.googleapis.com/css?family=Cabin"
          rel="stylesheet"
        ></link>
        <h2>Register</h2>
        <form
          className={styles.loginform}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <Input
            type="firstname"
            label="First Name"
            placeholder="First Name"
            {...register("firstname", {
              required: "This Field Is Required",
              minLength: {
                value: 2,
                message: "Field Is Too Short",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+$/,
                message: "Name Is Not Valid",
              },
            })}
            error={errors.firstname}
          />
          <Input
            type="lastname"
            label="Last Name"
            placeholder="Last Name"
            {...register("lastname", {
              required: "This Field Is Required",
              minLength: {
                value: 2,
                message: "Field Is Too Short",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+$/,
                message: "Name Is Not Valid",
              },
            })}
            error={errors.lastname}
          />

          <Input
            type="email"
            label="Email"
            placeholder="youremail@gmail.com"
            {...register("email", {
              required: "This Field Is Required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email Is Not Valid",
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            placeholder="********"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Field Is Too Short",
              },
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "Passwords Do No Match"
                  : true,
            })}
            error={errors.confirmPassword}
          />
          <Input
            type="address"
            label="Address"
            {...register("address", {
              required: true,
              minLength: {
                value: 5,
                message: "Field Is Too Short",
              },
            })}
            error={errors.address}
          />
          <Input
            className="pininput"
            type="text"
            label="Manager PIN"
            placeholder="Enter your PIN"
            {...register("pin", {
              required: "PIN is required to register as a manager",
            })}
            error={errors.pin}
          />
          {pinError && <p className={styles.error}>{pinError}</p>}

          <button className={styles.loginbuttons} type="submit">
            Register
          </button>
          <div className={styles.registerlink}>
            <Link
              to={`/ManagerMainPage/managerlogin${
                returnurl ? "?returnurl=" + returnurl : ""
              }`}
            >
              Already have an admin account? Login here.
            </Link>
          </div>
          <br></br>
          <div>
            <Link to={`/login${returnurl ? "?returnurl=" + returnurl : ""}`}>
              Customer Login Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
