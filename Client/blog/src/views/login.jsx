import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AutheticationService from '../services/authentication-service';
import {UserConsumer} from '../components/context/user';
import toastr from 'toastr';

class Login extends Component {
    static service = new AutheticationService();

    state = {
        email:'',
        password:'',
    };

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = async (event) => {
        const {email, password} = this.state;
        const {updateUser} = this.props;

        event.preventDefault();

        const credentials = {
            email,
            password
        }
                const result = await Login.service.login(credentials);
                if(!result.success) {
                    toastr.error(Object.values(result.errors).join(" "),'Problems with logging in');
                    return;
                }

                window.localStorage.setItem('auth_token',result.token);
                window.localStorage.setItem('user',JSON.stringify({
                    ...result.user,
                    isLoggedIn: true,
                    isAdmin: result.user.isAdmin
                }));

                updateUser({
                    isLoggedIn:true,
                    isAdmin: result.isAdmin,
                    updateUser: () =>(
                        updateUser()
                    ),
                    
                    ...result.user
                });
                
                toastr.success('Successfully logged in!');

                return <Redirect to='/'/>

    }

    render() {
        const {email,password} = this.state;
        const {isLoggedIn} = this.props;

        if(isLoggedIn) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <Form className="big" onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} value={email} placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={this.handleChange} value={password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        );
    }
    
}

const LoginWithContext = (props) =>{
    return (
        <UserConsumer>
            {
                ({isLoggedIn, updateUser})=>(
                    <Login
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default LoginWithContext;