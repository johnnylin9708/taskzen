import axios from "axios";

// const GATEWAY_URL = "http://localhost:8080";
const GATEWAY_URL = "https://taskzen-backend.onrender.com";

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

export const getAllMembers = async () =>
  await axios({
    method: "get",
    url: `${GATEWAY_URL}/members`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const getAllMembersByTeamId = async (id: number) =>
  await axios({
    method: "get",
    url: `${GATEWAY_URL}/members/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const createMember = async (memberReq: {
  teamId: number | null;
  name: string | undefined;
  description: string | undefined;
}) =>
  await axios({
    method: "post",
    url: `${GATEWAY_URL}/members`,
    data: {
      ...memberReq,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const createTask = async (taskReq: {
  title: string | null;
  initiator: string | null;
  startDate: string | null;
  dueDate: string | null;
  status: string | null;
  content: string | null;
}) =>
  await axios({
    method: "post",
    url: `${GATEWAY_URL}/tasks`,
    data: {
      ...taskReq,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const getAllTasksByUserId = async (id: string) =>
  await axios({
    method: "get",
    url: `${GATEWAY_URL}/tasks/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const getAllStatus = async () =>
  await axios({
    method: "get",
    url: `${GATEWAY_URL}/status`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });

export const createStatus = async (statusReq: {
  name: string | undefined;
  description: string | undefined;
}) =>
  await axios({
    method: "post",
    url: `${GATEWAY_URL}/status`,
    data: {
      ...statusReq,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
