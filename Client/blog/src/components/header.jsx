import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'react-bootstrap/NavLink';
import Dropdown from 'react-bootstrap/Dropdown';

import {UserConsumer} from '../components/context/user';
import CategoryContext from '../components/context/category';
import SearchForm from './search-form';

class  Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			categories:[]
		}
	}

	componentDidMount() {
		this.props.updateCategories();
	}

	render() {
		const {isAdmin,isLoggedIn, username, logout} = this.props;
		
		if(isAdmin){
			return(
			<Navbar className="navbar navbar-light" style={{"backgroundColor":"#e3f2fd"}}>
				<Fragment>
				<Nav className="mr-auto">
				   <Nav.Link href="/">Home</Nav.Link>
				   <Dropdown>
					   <Dropdown.Toggle variant="info-outline" id="dropdown-basic">
						   Categories
					   </Dropdown.Toggle>

					   <Dropdown.Menu >
					   		{
									this.props.dropdownCategories.map(category =>(
									<Dropdown.Item key={category._id} href={`/category/${category.name}`}>{category.name}</Dropdown.Item>))
								}
					   </Dropdown.Menu>
					</Dropdown>
				   <Nav.Link href="/createpost">Create Post</Nav.Link>		
				   <Nav.Link href="/createcategory">Create Category</Nav.Link>
				   <Nav.Link href="/manageposts">Manage Posts</Nav.Link>		
				 </Nav>
				 
			   <Nav className="float-right">
				   <Link>Hello, {username}</Link>
				   <Nav.Link href="#" onClick={logout}>Log out</Nav.Link>
			   </Nav>
			   <SearchForm/>
		   </Fragment>
		   </Navbar>
				)
					
		}
		else if(isLoggedIn){
			return(<Fragment>
				<Navbar className="navbar navbar-light" style={{"backgroundColor":"#e3f2fd"}}>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Dropdown>
					   <Dropdown.Toggle variant="info-outline" id="dropdown-basic">
						   Categories
					   </Dropdown.Toggle>

					   <Dropdown.Menu >
					   		{
									this.props.dropdownCategories.map(category =>(
									<Dropdown.Item key={category._id} href={`/category/${category.name}`}>{category.name}</Dropdown.Item>))
								}
					   </Dropdown.Menu>
					</Dropdown>
				  </Nav>
				<Nav className="float-right">
					<Link>Hello, {username}</Link>
					<Nav.Link href="#" onClick={logout}>Log out</Nav.Link>
				</Nav>
				<SearchForm/>
			</Navbar>
			</Fragment>)
		}
		else {
			return(
			<Fragment>
				<Navbar className="navbar navbar-light" style={{"backgroundColor":"#e3f2fd"}}>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Dropdown>
					   <Dropdown.Toggle variant="info-outline" id="dropdown-basic">
						   Categories
					   </Dropdown.Toggle>

					   <Dropdown.Menu >
					   		{
									this.props.dropdownCategories.map(category =>(
									<Dropdown.Item key={category._id} href={`/category/${category.name}`}>{category.name}</Dropdown.Item>))
								}
					   </Dropdown.Menu>
					</Dropdown>
				</Nav>
				<Nav.Link href="/login">Login</Nav.Link>
				<Nav.Link href="/register">Register</Nav.Link>
				<SearchForm/>
				</Navbar>
			</Fragment>)
					
		}
	}	
}		

const HeaderWithContext = (props) => {
    return (
		<CategoryContext.Consumer>
			{({dropdownCategories,updateCategories})=>(
				<UserConsumer>
					{
						({isLoggedIn, isAdmin, username}) => (
							<Header 
								{...props}
								dropdownCategories={dropdownCategories}
								updateCategories = {updateCategories} 
								isLoggedIn={isLoggedIn} 
								isAdmin = {isAdmin}
								username={username}
							/>
						)
					}
				</UserConsumer>)
			}
		</CategoryContext.Consumer> 
        )
   
}

export default HeaderWithContext;

