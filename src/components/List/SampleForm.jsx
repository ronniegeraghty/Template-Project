import React, { useState } from "react";

const SampleForm = (params) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    params.addSample(name, message);
    setName("");
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-inline mb-3">
        <div className="form-row">
          <div className="col-sm">
            <input
              type="text"
              onChange={handleChangeName}
              value={name}
              name="name"
              className="form-control"
              placeholder="Enter Name..."
              aria-label="Enter Name..."
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              onChange={handleChangeMessage}
              value={message}
              name="message"
              className="form-control"
              placeholder="Enter a Message..."
              aria-label="Enter a Message..."
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary ml-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SampleForm;
