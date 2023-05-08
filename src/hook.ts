import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "API";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user information
      // const decodedToken = jwt_decode(token);
      setIsAuth(true);
    }
  }, [navigate]);

  async function authLogin(data: FormData) {
    const response = await login({
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    });
    localStorage.setItem("token", response?.data?.tokenData);
    setIsAuth(true);
    navigate("/");
  }

  function authLogout() {
    // Remove the token from local storage and clear the user state
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  }

  return { isAuth, authLogin, authLogout };
}
