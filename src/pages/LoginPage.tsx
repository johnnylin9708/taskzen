import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authvalidator } from "validators/index";
import { useAuth } from "hook";
import Loading from "components/Loading";
import AlertMessage from "components/AlertMessage";

const LoginPage: React.FC = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();
  const { authInfo, authLogin } = useAuth();
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    setIsFetching(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email: FormDataEntryValue | undefined = data.get("email")?.toString();

    await setErrorMsg(authvalidator.emailValidator(email));

    if (errorMsg) {
      return;
    }

    const response = await authLogin(data);

    if (response.status != 200) {
      setErrorMsg(response.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 500);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    if (authInfo.id) {
      navigate("/workspace");
    }
  }, [authInfo]);

  return (
    <>
      {isFetching && <Loading />}
      {errorMsg && <AlertMessage errorMessage={errorMsg} />}
      <div className="container mt-5 shadow">
        <div className="row">
          <div
            className="col-7"
            style={{
              backgroundImage: "url(https://source.unsplash.com/featured)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="col-5 mb-5">
            <form onSubmit={handleSubmit}>
              <h3 className="mt-5 mb-4">Sign In</h3>
              <div className="mb-3 text-start">
                <label className="form-label">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="email"
                />
              </div>
              <div className="mb-4 text-start">
                <label className="form-label">Password</label>
                <div className="input-group mb-3">
                  <input
                    id="password"
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    show
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-outline-dark">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
