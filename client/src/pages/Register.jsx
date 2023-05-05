import React from 'react'
import{ Button ,Form}from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/Schema"; 

import { Link, useNavigate} from 'react-router-dom';
import { callRequest } from '../utils/common';
import { API_REGISTER } from '../config/Api';
import { toast } from 'react-toastify';


const Register = () => {
  const { register,handleSubmit,formState: { errors },} = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate()

  const onSubmit = data =>{
      callRequest("POST", `${API_REGISTER}`,false,data).then((res)=>{
      toast.success(res.data.message)
      navigate("/")
    }).catch(error => toast.error(error.response.data.message))
  };

  return (
    <>
    <div className="login">
      <h3 className="text-center">Register</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group  className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter User Name" {...register("username")}/>
          <p style={{color:"red"}}>{errors.username?.message}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"placeholder="Enter Password"{...register("password")}/>
          <p style={{color:"red"}}>{errors.password?.message}</p>
        </Form.Group>

        <Button type="submit" className="w-100 mt-3">
          Register
        </Button>
        <p className='mt-3 text-center text-muted'> have an account ? <Link to="/">Login</Link></p>
      </Form>
    </div>
   </>
  )
}

export default Register;
