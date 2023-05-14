import { getAllMembers } from "API";
import React, { useEffect, useState } from "react";

const TaskCreationModal = () => {
  const [members, setMembers] = useState<
    { id: number; name: string; teamName: string }[]
  >([]);

  useEffect(() => {
    async function fetchMemberData() {
      const response = await getAllMembers();
      setMembers(response.data);
    }
    fetchMemberData();
  }, []);
  return (
    <>
      <div
        className="modal fade"
        id="taskCreationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="taskCreationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="taskCreationModalLabel">
                Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Task Title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Initiator</label>
                  <select
                    className="form-select"
                    id="initiator"
                    name="initiator"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {members.length > 0 &&
                      members.map((member) => (
                        <option
                          value={member.id}
                        >{`[${member.teamName}]  ${member.name}`}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Assignee</label>
                  <select
                    className="form-select"
                    id="assignee"
                    name="assignee"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {members.length > 0 &&
                      members.map((member) => (
                        <option
                          value={member.id}
                        >{`[${member.teamName}]  ${member.name}`}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>

                    <option value={1}>123123123</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCreationModal;
