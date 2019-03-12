import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AutheticationService from '../services/authentication-service';
import {UserConsumer} from '../components/context/user';

class Login extends Component {
    static service = new AutheticationService();

    state = {
        email:'',
        password:'',
        error:'',
    };

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
        const {email, password} = this.state;
        const {updateUser} = this.props;

        event.preventDefault();

        const credentials = {
            email,
            password
        }

        this.setState({
            error:''
        }, async ()=>{
            try{
                const result = await Login.service.login(credentials);

                if(!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
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
                
                return <Redirect to='/'/>
            } catch(err) {
                this.setState({
                    error:err.message
                })
            }
        });
    }

    render() {
        const {email,password, error} = this.state;
        const {isLoggedIn} = this.props;

        if(isLoggedIn) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <Form className="big" onSubmit={this.handleSubmit}>
            {
                error.length
                ? <div>Something went wrong : {error}</div>
                :null
            }
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