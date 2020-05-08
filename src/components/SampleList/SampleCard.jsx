import React, { useState } from "react";
import PropTypes from "prop-types";

const SampleCard = ({ sample, deleteSample, setWarningMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(sample.name);
  const [oldName, setOldName] = useState(sample.name);
  const [message, setMessage] = useState(sample.message);
  const [oldMessage, setOldMessage] = useState(sample.message);

  const editSample = () => {
    if (editMode) {
      updateSample();
    }
    setEditMode(!editMode);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const updateSample = () => {
    if (!name || !message) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: "All fields must be filled out!",
      });
      setName(oldName);
      setMessage(oldMessage);
      return;
    }

    fetch(`/api/sample/${sample._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        message: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((sampleUpdated) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${sampleUpdated}`,
        });
        setOldName(name);
        setOldMessage(message);
      })
      .catch((error) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `ERROR Updating Sample: ${error}`,
        });
      });
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 pl-0">
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col-7 my-auto mr-1" hidden={editMode}>
              {name}
            </h5>
            <input
              type="text"
              className="form-control col-7 my-auto mr-1"
              placeholder="Sample Name"
              aria-label="Sample Name"
              value={name}
              onChange={handleChangeName}
              hidden={!editMode}
            />

            <button
              type="button"
              className="btn btn-secondary col-2 mx-1"
              onClick={editSample}
            >
              {/* FontAwesome Edit Icon */}
              <i className="fas fa-edit"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger col-2 ml-1"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => deleteSample(sample)}
            >
              {/* FontAwesome Trash Icon */}
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <div className="row my-2">
            <p className="card-text col-12 my-auto" hidden={editMode}>
              {message}
            </p>
            <input
              type="text"
              className="form-control col-12 my-auto"
              placeholder="Sample Message"
              aria-label="Sample Name"
              value={message}
              onChange={handleChangeMessage}
              hidden={!editMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

SampleCard.propTypes = {
  sample: PropTypes.any,
  deleteSample: PropTypes.func,
  setWarningMessage: PropTypes.func,
};

export default SampleCard;
