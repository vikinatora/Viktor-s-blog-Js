import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthenticationService from '../services/authentication-service';
import {UserConsumer} from '../components/context/user';
import toastr from 'toastr';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
        }
    }
    static service = new AuthenticationService();

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

       const {username, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword) {
            toastr.error("Passwords don't match",'Problem with register')
        }

        const credentials = {
            username,
            email,
            password
        }

        const result = await Register.service.register(credentials);

        if(!result.success) {
            toastr.error(Object.values(result.errors),'Problem with register');
            return
        }

        toastr.success('You can now log in to post comments! :)','Successfully registered!');
        this.props.history.push('/login')
    }

    render() {
        const {username,email ,password} = this.state;
        const {isLoggedIn} = this.props;

        if(isLoggedIn) {
            return (
                <Redirect to="/"/>
            );
        }

        return (
            <Form className="big" onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={username} placeholder="Enter username" />
                    <Form.Text className="text-muted">
                    We'll never share your username with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={this.handleChange} value={email} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={this.handleChange} value={password} placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control type="password" onChange={this.handleChange} placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

const RegisterWithContext = (props) =>{
    return (
        <UserConsumer>
            {
                ({isLoggedIn, updateUser})=>(
                    <Register
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default RegisterWithContext;

