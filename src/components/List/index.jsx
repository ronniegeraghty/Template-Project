import React, { useState } from "react";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";
import SampleCard from "./SampleCard";
import SampleForm from "./SampleForm";

const List = () => {
  const [samples, setSamples] = useState([]);
  const [warningMessage, setWarningMessage] = useState({
    warningMessageOpen: false,
    warningMessageText: "",
  });
  const getSamples = () => {
    let promiseSample = fetch("/api/sample").then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });
    return promiseSample;
  };

  const deleteSample = (sample) => {
    fetch(`/api/sample/${sample._id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        setSamples(samples.filter((sample) => sample._id !== result._id));
      })
      .catch((error) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `ERROR Deleting Sample: ${error}`,
        });
      });
  };

  const addSample = (name, message) => {
    // Warning Pop Up if the user submits an empty message
    if (!name || !message) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: "All fields must be filled out!",
      });
      return;
    }

    fetch("/api/sample", {
      method: "POST",
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
      .then((sampleAdded) => {
        setSamples([...samples, sampleAdded]);
      })
      .catch((error) =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `ERROR Adding Sample: ${error}`,
        })
      );
  };

  const handleWarningClose = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: "",
    });
  };

  React.useEffect(() => {
    getSamples()
      .then((samples) => {
        setSamples(samples);
      })
      .catch((error) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `Error getting samples: ${error}`,
        });
      });
  }, []);

  return (
    <main id="mainContent" className="container">
      <div className="row">
        <div className="col mt-5 p-0">
          <h3>Samples List</h3>
        </div>
        <div className="col-12 p-0">
          <SampleForm addSample={addSample} />
        </div>
        {samples.map((sample) => (
          <SampleCard
            key={sample._id}
            sample={sample}
            deleteSample={deleteSample}
          />
        ))}
        <WarningMessage
          open={warningMessage.warningMessageOpen}
          text={warningMessage.warningMessageText}
          onWarningClose={handleWarningClose}
        />
      </div>
    </main>
  );
};

export default List;
