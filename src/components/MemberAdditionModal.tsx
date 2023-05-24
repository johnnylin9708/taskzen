import React from "react";

interface Props {
  submit: (event: React.MouseEvent<HTMLFormElement>) => void;
}

const MemberAdditionModal = (props: Props) => {
  const { submit } = props;
  return (
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
          <form id="memberAdditionForm" onSubmit={submit}>
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
  );
};

export default MemberAdditionModal;
