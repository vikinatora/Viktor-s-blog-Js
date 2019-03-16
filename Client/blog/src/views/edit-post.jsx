import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {UserConsumer} from '../components/context/user';
import PostService from '../services/posts-service';
import CategoriesService from '../services/categories-service';
import NotFound from '../views/not-found';
import toastr from 'toastr'

class EditPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            title:'',
            content:'',
            categories:[],
            category:''
        }
    }
    static postService = new PostService();
    static categoriesService = new CategoriesService();

    
    async componentDidMount() {
        let id = this.props.match.params.id;
        let initialCategories = [];
        try {
            let categories = await EditPost.categoriesService.getCategories();
            let result = await EditPost.postService.getPost(id);
            console.log(result);
            if(!result.success){
                toastr.error("Couldn't find the post you are looking for",'Problems with finding post');
                this.props.history.push('/')
            }

            const {title,content,category} = result.data;

            initialCategories = categories.map((category) => {
                return category.name
            });
            
            this.setState({
                id,
                title,
                content,
                categories:initialCategories,
                category:category.name
            });

        }
        catch(err){
            return <NotFound/>
        }          
    }

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = async (event) => {
        const {title, content,category} = this.state;

        event.preventDefault();

        const data = {
            id:this.state.id,
            title,
            content,
            category
        }

        const result = await EditPost.postService.editPost(data);

        if(!result.success) {
            toastr.error(Object.values(result.errors).join("\r\n"),'Problems with editing post');
            return;
        }

        toastr.success('Post edited successfully!');
        this.props.history.push('/');

    }

    render() {
        const {isLoggedIn, isAdmin} = this.props;

        const {title,content, categories, category} = this.state;

        if(!isLoggedIn || !isAdmin) {
            this.props.history.push('/');
        }
        
        let optionCategories = categories.map((category)=>
            <option key={category}>{category}</option>
        )
        return (
            <div style={{"textAlign":"center"}}>
                <div style={{"display":"inlineBlock"}}>
                <Form  onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={title} placeholder="Enter title" />
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} as="textarea" rows="4" value={content} placeholder="Enter post content" />
                </Form.Group>
                <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} value = {category}>
                {optionCategories}
                </Form.Control>
            </Form.Group>
                <Button variant="primary" type="submit">
                    Edit
                </Button>
            </Form>
                </div>
            </div>
            
        );
    }
}

const EditPostWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn, isAdmin})=>(
                    <EditPost
                        {...props}
                        isLoggedIn={isLoggedIn}
                        isAdmin = {isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default EditPostWithContext