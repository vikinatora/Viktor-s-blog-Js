import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {UserConsumer} from '../components/context/user';
import CategoriesService from '../services/categories-service';
import toastr from 'toastr';



class CreateCategory extends Component {
    constructor(props){
        super(props);

        this.state = {
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

    handleSubmit = async (event) => {
        const {name, imageUrl} = this.state;
        event.preventDefault();

        const data = {
            name,
            imageUrl
        }

        const result = await CreateCategory.service.createCategory(data);
        if(!result.success) {
            toastr.error(Object.values(result.errors).join("\r\n"),'Problems with creating category')
            return
        }  
        toastr.success(`Successfully created category ${name}`);
        this.props.history.push('/');
    }

    render() {
        const {isLoggedIn, isAdmin} = this.props;

        const {name, imageUrl} = this.state;

        if(!isLoggedIn || !isAdmin) {
            return <Redirect to="/"/>
        }

        return (
            <Form className="col-md-6 centered" onSubmit={this.handleSubmit}>
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