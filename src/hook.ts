import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "API";

export function useAuth() {
  const [authInfo, setAuthInfo] = useState<{
    id: string;
    username: string;
  }>({ id: "", username: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("username");
    // if (token) {
    // Decode the token to get user information
    // const decodedToken = jwt_decode(token);
    // }
    setAuthInfo({ id: id || "", username: username || "" });
  }, [navigate]);

  async function authLogin(data: FormData) {
    const response = await login({
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    });
    if (!response?.data?.tokenData) return response;
    localStorage.setItem("token", response?.data?.tokenData);
    localStorage.setItem("id", response?.data?.id);
    localStorage.setItem("username", response?.data?.username);
    setAuthInfo({ id: response?.data?.id, username: response?.data?.username });
    navigate("/");

    return response;
  }

  function authLogout() {
    // Remove the token from local storage and clear the user state
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setAuthInfo({ id: "", username: "" });
    navigate("/login");
  }

  return { authInfo, authLogin, authLogout };
}
