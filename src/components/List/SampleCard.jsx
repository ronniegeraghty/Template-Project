import React from "react";
import PropTypes from "prop-types";

const SampleCard = ({ sample, deleteListItem }) => {
  React.useEffect(() => {
    console.log(`SAMPLE: ${sample.name}`);
  }, []);
  return (
    <div className="col-12 mb-3 border">
      <div className="row">
        <div className="col-11">
          <p className="mt-3">
            {sample.name}, {sample.message}
          </p>
        </div>
        <div className="col-1">
          <button
            type="button"
            className="close py-2"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => deleteListItem(sample)}
          >
            <div aria-hidden="true">&times;</div>
          </button>
        </div>
      </div>
    </div>
  );
};

SampleCard.propTypes = {
  sample: PropTypes.any,
  deleteListItem: PropTypes.func,
};

export default SampleCard;
