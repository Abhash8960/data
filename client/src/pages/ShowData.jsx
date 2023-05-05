import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Modal, Row ,Form} from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateProvider";
import {saveAs} from "file-saver";
import Header from "../component/Header";
import { API_DELETE_PROFILE, API_DOWNLOAD, BASE_URL } from "../config/Api";
import { callRequest } from "../utils/common";

const ShowData = () => {
  const { allData, downloaUrl, setDownloaUrl } = useContext(StateContext);
  const [show, setShow] = useState(false);
  const [otp,setOtp] = useState()
  const [id,setId] = useState()

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id)
    setShow(true)
};

  const handelDelete = (id) => {
    callRequest("DELETE", `${API_DELETE_PROFILE}/${id}`,true,).then((res)=>{
      navigate("/main");
    })
  };

  const handleDownload = () => {
    let data = { id,otp}

    callRequest("POST", `${API_DOWNLOAD}`,true,data).then((res)=>{
      setDownloaUrl(res.data.data)
      console.log(res.data.data)
    })
  
  }

  const handleClick = ()=>{
   saveAs(downloaUrl, "download");
   }

  return (
    <>
    <Header/>
      <Container>
        <Row>
          {allData.length > 0
            ? allData.map((item) => (
                <Col key={item._id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top"src={`${BASE_URL}/${item.filename}`}/>
                    <Card.Body>
                      <Button variant="primary"className="w-100"onClick={() =>handleShow(item._id)}>
                        Download
                      </Button>
                      <Button variant="danger"className="w-100 mt-2" onClick={() => handelDelete(item._id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : ""}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control type="text"onChange={(e) => setOtp(e.target.value)} placeholder="Enter Code"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
           Download
          </Button>
          <button onClick={handleClick} className="button">
          <a href={downloaUrl}  target="_blank"className="mt-5 text-center" download>{downloaUrl} </a>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowData;
