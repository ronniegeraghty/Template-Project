import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const SamplesList = () => {
  const [samples, setSamples] = useState([]);
  useEffect(async () => {
    let response = await fetch("/api/sample");
    console.log(`RESPONSE: ${response}`);
  }, []);
  return (
    <div>
      <h1>Samples List</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SamplesList;
