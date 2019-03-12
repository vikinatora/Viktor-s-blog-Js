import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthenticationService from '../services/authentication-service';
import {UserConsumer} from '../components/context/user';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            error:''
        }
    }
    static service = new AuthenticationService();

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
       const {username, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword) {
            this.setState({
                error:'Passwords must match'
            })
        }

        this.setState({
            error:''
        }, async ()=>{
            const credentials = {
                username,
                email,
                password
            }
            try{
                const result = await Register.service.register(credentials);

                if(!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }

                window.localStorage.setItem('auth_token',result.token);
                window.localStorage.setItem('user',JSON.stringify({
                    ...result.user,
                    isLoggedIn:true
                    })
                );
            }
            catch(err) {
                 this.setState({
                     error:err.message
                 })
            }
        })
       

       event.preventDefault();
    }

    render() {
        const {username,email ,password, error} = this.state;
        const {isLoggedIn} = this.props;

        if(isLoggedIn) {
            return (
                <Redirect to="/"/>
            );
        }

        return (
            <Form className="big" onSubmit={this.handleSubmit}>
                {
                error.length
                ? <div>Something went wrong : {error}</div>
                :null
                }
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

