import React, { useEffect, useState } from "react";
import { createMember, createTeam, getAllMembers, getAllTeams } from "API";

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
      name: data.get("name")?.toString() || "",
      description: data.get("description")?.toString() || "",
    };

    const response = await createMember(memberInfo);

    if (response.message === "created") {
      await handleModalClosed("memberAdditionModal");
    }

    setMembers([...members, memberInfo]);
  };

  const handleModalClosed = async (id: string) => {
    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById(`${id}`)
    );

    await modal.hide();
  };

  useEffect(() => {
    async function fetchTeamData() {
      const teamsResponse = await getAllTeams();
      setTeams(teamsResponse.data);
    }
    fetchTeamData();
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
                      const membersResponse = await getAllMembers(team.id);
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
      </div>
      <div
        className="modal fade"
        id="teamAdditionModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="teamAdditionModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="teamAdditionModalLabel">
                Team Addition
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleTeamAdditionModalSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">TeamName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Team Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="memberAdditionModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="memberAdditionModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="memberAdditionModalLabel">
                Member Addition
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleMemberAdditionModalSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">MemberName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Member Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
