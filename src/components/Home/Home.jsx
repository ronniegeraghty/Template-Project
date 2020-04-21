import React, { useState } from "react";
import classnames from "classnames";
import styles from "./masterdetail.module.css";
import { Jumbotron, Button, Container, Modal } from "react-bootstrap";
import AddSampleModal from "./AddSampleModal";

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main id="mainContent">
      <Jumbotron fluid>
        <Container>
          <h1 className="display-4">Sample API</h1>
          <p className="lead">Try out our Sample API!</p>
          <hr className="my-4" />
          <p>It uses the REST API framework with a mongoDB back-end.</p>
          <AddSampleModal />
        </Container>
      </Jumbotron>
    </main>
  );
};

export default Home;
