import React, {useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { callRequest } from "../utils/common";
import { API_GET_PROFILE, API_PROFILE } from "../config/Api";
import { StateContext } from "../context/StateProvider";
import { toast } from "react-toastify";

const Main = () => {
  const [file, setFile] = useState();
 const {setAlldata} = useContext(StateContext)
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData();
    fd.append("file", file);

     callRequest("POST", `${API_PROFILE}`,true,fd).then((res)=>{
      toast.success(res.data.message)
    }).catch(error => toast.error(error.response.data.message))
  };


  const handelAllData = () => {
    callRequest("GET", `${API_GET_PROFILE}`,true).then((res)=>{
      setAlldata(res.data)
      navigate("/show")
    }).catch(error => toast.error(error.response.data.message))
    
  };
 

  return (
    <>
    <Header/>
      <div className="login">
        <h3 className="text-center">Upload</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mt-3">
            Upload
          </Button>
        </Form>

        <Button type="submit" className="w-100 mt-3" onClick={handelAllData}>
          Show Data
        </Button>
      </div>

      
    </>
  );
};

export default Main;
