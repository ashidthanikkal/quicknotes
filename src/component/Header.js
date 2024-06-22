import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div className='container'>
      <Navbar style={{backgroundColor:"black"}} className='p-2 rounded-bottom-4'>
        <Container >
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://i.postimg.cc/t4wj4wb8/Screenshot-2024-06-08-162321-removebg-preview.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <b style={{color:"white"}}>QuickNotes</b>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
