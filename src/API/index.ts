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

export const getAllTeams = async () =>
  await axios({
    method: "get",
    url: `${GATEWAY_URL}/teams`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const createTeam = async (teamReq: {
  name: string | undefined;
  description: string | undefined;
}) =>
  await axios({
    method: "post",
    url: `${GATEWAY_URL}/teams`,
    data: {
      ...teamReq,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
