import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

   const handelLogout = () => { 
       localStorage.removeItem("token")
       navigate("/")
       
   }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Demo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button onClick={handelLogout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
