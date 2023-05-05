import React from 'react'
import{ Button ,Form}from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/Schema"; 

import { Link, useNavigate} from 'react-router-dom';
import { callRequest } from '../utils/common';
import { API_LOGIN } from '../config/Api';
import { toast } from 'react-toastify';



const Login = () => {
  const { register,handleSubmit,formState: { errors },} = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate()

  const onSubmit = data =>{
    callRequest("POST", `${API_LOGIN}`,false,data).then((res)=>{
      localStorage.setItem("token",res.data.token)
      navigate("/main")
      toast.success(res.data.message)
    }).catch(error => toast.error(error.response.data.message))
  };
console.log(localStorage.getItem("token"))
  return (
    <>
    <div className="login">
      <h3 className="text-center">Login</h3>

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
          Login
        </Button>
        <p className='mt-3 text-center text-muted'>don't have an account ? <Link to="/register">Register</Link></p>
      </Form>
    </div>
   </>
  )
}

export default Login
