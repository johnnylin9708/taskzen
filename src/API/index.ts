import axios from "axios";

const GATEWAY_URL = "http://localhost:8080";

export const login = async (loginInfo: {
  email: string | undefined;
  password: string | undefined;
}) =>
  await axios({
    method: "post",
    url: `${GATEWAY_URL}/login`,
    data: {
      ...loginInfo,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
