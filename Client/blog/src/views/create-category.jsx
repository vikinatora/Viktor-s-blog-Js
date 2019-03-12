import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {UserConsumer} from '../components/context/user';
import CategoriesService from '../services/categories-service';

class CreateCategory extends Component {
    constructor(props){
        super(props);

        this.state = {
            error:'',
            name:'',
            imageUrl:''
        }
    }
    static service = new CategoriesService();


    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
        const {name, imageUrl} = this.state;

        event.preventDefault();

        const data = {
            name,
            imageUrl
        }

        this.setState({
            error:''
        }, async ()=>{
            try{
                const result = await CreateCategory.service.createCategory(data);

                if(!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }
                
                this.props.history.push('/');

            } catch(err) {
                this.setState({
                    error:err.message
                })
            }
        });
    }

    render() {
        const {isLoggedIn, isAdmin} = this.props;

        const {error, name, imageUrl} = this.state;

        if(!isLoggedIn || !isAdmin) {
            return <Redirect to="/"/>
        }

        return (
            <Form className="col-md-6 centered" onSubmit={this.handleSubmit}>
            {
                error.length
                ? <div>Something went wrong : {error}</div>
                : null
            }
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} value={name} placeholder="Enter name of category" />
            </Form.Group>
            <Form.Group controlId="imageUrl">
                <Form.Label>Category Image</Form.Label>
                <Form.Control type="text" onChange={this.handleChange} value={imageUrl} placeholder="Enter an image url that will appear on all posts with the given category" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        );
    }
}

const CreateCategoryWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn, isAdmin})=>(
                    <CreateCategory
                        {...props}
                        isLoggedIn={isLoggedIn}
                        isAdmin = {isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default CreateCategoryWithContext