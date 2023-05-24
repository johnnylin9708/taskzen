import React, { useEffect, useState } from "react";
import {
  createMember,
  createStatus,
  createTeam,
  getAllMembersByTeamId,
  getAllStatus,
  getAllTeams,
} from "API";
import TeamAdditionModal from "./TeamAdditionModal";
import MemberAdditionModal from "./MemberAdditionModal";
import StatusAdditionModal from "./StatusAdditionModal";

const Setting = () => {
  const [teams, setTeams] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [team, setTeam] = useState<{
    id: number;
    name: string;
    description: string;
  }>({ id: 0, name: "", description: "" });

  const [members, setMembers] = useState<
    { name: string; description: string }[]
  >([]);

  const [status, setStatus] = useState<{ name: string; description: string }[]>(
    []
  );

  const handleTeamAdditionModalSubmit = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const teamInfo = {
      id: 0,
      name: data.get("name")?.toString() || "",
      description: data.get("description")?.toString() || "",
    };

    const response = await createTeam(teamInfo);

    if (response.message === "created") {
      await handleModalClosed("teamAdditionModal");
    }

    setTeams([...teams, teamInfo]);
  };

  const handleMemberAdditionModalSubmit = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const memberInfo = {
      teamId: team.id,
      teamName: team.name,
      name: data.get("name")?.toString() || "",
      description: data.get("description")?.toString() || "",
    };

    const response = await createMember(memberInfo);

    if (response.message === "created") {
      await handleModalClosed("memberAdditionModal");
    }

    setMembers([...members, memberInfo]);
  };

  const handleStatusAddtionSubmit = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const statusInfo = {
      name: data.get("name")?.toString() || "",
      description: data.get("description")?.toString() || "",
    };
    const response = await createStatus(statusInfo);

    if (response.message === "created") {
      await handleModalClosed("statusAdditionModal");
    }

    setStatus([...status, statusInfo]);
  };

  const handleModalClosed = async (id: string) => {
    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById(`${id}`)
    );

    await modal.hide();
  };

  const formReset = (formId: string) => {
    const form = document.getElementById(formId);
    if (form) {
      const inputs = form.querySelectorAll<HTMLInputElement>(
        "input, textarea, select"
      );
      inputs.forEach((input: HTMLInputElement) => {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = false;
        } else {
          input.value = "";
        }
      });
    }
  };

  const modalCloseListener = (modalId: string, modalFormId: string) => {
    const modal = document.getElementById(modalId);
    if (modal)
      modal.addEventListener("hidden.bs.modal", (event) => {
        formReset(modalFormId);
      });
  };

  useEffect(() => {
    async function fetchTeamData() {
      const teamsResponse = await getAllTeams();
      setTeams(teamsResponse.data);
    }
    fetchTeamData();

    async function fetchStatusData() {
      const response = await getAllStatus();
      setStatus(response.data);
    }
    fetchStatusData();

    modalCloseListener("memberAdditionModal", "memberAdditionForm");
    modalCloseListener("teamAdditionModal", "teamAdditionForm");
    modalCloseListener("statusAdditionModal", "statusAdditionForm");
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3 className="mt-5">Team</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#teamAdditionModal"
                    >
                      Add
                    </button>
                  </th>
                </tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      setTeam(team);
                      const membersResponse = await getAllMembersByTeamId(
                        team.id
                      );
                      setMembers(membersResponse.data);
                    }}
                  >
                    <th scope="row">{index}</th>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {team.id !== 0 && (
            <div className="col-6">
              <h3 className="mt-5">{team.name} Member</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#memberAdditionModal"
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {members &&
                    members.map((member, index) => (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>{member.name}</td>
                        <td>{member.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <hr className="my-5" />
        <div className="row mb-5">
          <div className="col-6">
            <h3>Status</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#statusAdditionModal"
                    >
                      Add
                    </button>
                  </th>
                </tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {status.map((status, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{status.name}</td>
                    <td>{status.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TeamAdditionModal submit={handleTeamAdditionModalSubmit} />
      <MemberAdditionModal submit={handleMemberAdditionModalSubmit} />
      <StatusAdditionModal submit={handleStatusAddtionSubmit} />
    </>
  );
};

export default Setting;
