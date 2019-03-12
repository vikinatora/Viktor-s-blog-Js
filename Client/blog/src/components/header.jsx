import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {UserConsumer} from '../components/context/user';

const Header =({isLoggedIn, isAdmin, username, logout}) => {
	let NavBar ='';
		if(isAdmin){
			NavBar =
					<Fragment>
				 		<Nav className="mr-auto">
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/createpost">Create Post</Nav.Link>		
							<Nav.Link href="/createcategory">Create Category</Nav.Link>
							<Nav.Link href="/manageposts">Manage Posts</Nav.Link>		
	  					</Nav>
						<Nav className="float-right">
							<span>Hello, {username}</span>
							<Nav.Link href="#" onClick={logout}>Log out</Nav.Link>
						</Nav>
						<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
						</Form>
						</Fragment>
		}
		else if(isLoggedIn){
			NavBar = <Fragment>
						<Nav className="mr-auto">
							<Nav.Link href="/">Home</Nav.Link>
	  					</Nav>
						<Nav className="float-right">
							<span>Hello, {username}</span>
							<Nav.Link href="#" onClick={logout}>Log out</Nav.Link>
						</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
					</Fragment>
		}
		else {
			NavBar = 
					<Fragment>
						<Nav className="mr-auto">
							<Nav.Link href="/">Home</Nav.Link>
	  					</Nav>
						<Nav.Link href="/login">Login</Nav.Link>
						<Nav.Link href="/register">Register</Nav.Link>
						<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
					</Fragment>
		}

        return (
			<Navbar bg="light" expand="lg">
  				<Navbar.Brand href="#">Viktor's Blog</Navbar.Brand>
  				<Navbar.Toggle aria-controls="basic-navbar-nav" />
  			<Navbar.Collapse id="basic-navbar-nav">
    			{NavBar}
			</Navbar.Collapse>
			</Navbar>
			);
}

const HeaderWithContext = (props) => {
    return ( 
        <UserConsumer>
        {
            ({isLoggedIn, isAdmin, username}) => (
                <Header 
                    {...props} 
					isLoggedIn={isLoggedIn} 
					isAdmin = {isAdmin}
					username={username}
                />
            )
        }
    </UserConsumer>)
   
}

export default HeaderWithContext;

