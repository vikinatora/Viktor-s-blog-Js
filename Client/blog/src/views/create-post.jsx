import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {UserConsumer} from '../components/context/user';
import PostService from '../services/posts-service';
import CategoriesService from '../services/categories-service';

class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state = {
            error:'',
            title:'',
            content:'',
            categories:[],
            category:''
        }
    }
    static postService = new PostService();
    static categoriesService = new CategoriesService();

    
    async componentDidMount() {
        let initialCategories = [];
        const data = await CreatePost.categoriesService.getCategories();
        console.log(data);
        initialCategories = data.map((category) => {
            return category.name
        });
        
        this.setState({
            categories:initialCategories,
            category:initialCategories[0]
        });
 
    }

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
        const {title, content,category} = this.state;

        event.preventDefault();

        const data = {
            title,
            content,
            category
        }

        this.setState({
            error:''
        }, async ()=>{
            try{
                const result = await CreatePost.postService.createPost(data);

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

        const {error,title,content, categories, category} = this.state;

        if(!isLoggedIn || !isAdmin) {
            this.props.history.push('/');
        }
        
        let optionCategories = categories.map((category)=>
            <option key={category}>{category}</option>
        )
        return (
            <Form  className="col-sm-6" onSubmit={this.handleSubmit}>
            {
                error.length
                ? <div>Something went wrong : {error}</div>
                :null
            }
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
                Submit
            </Button>
        </Form>
        );
    }
}

const CreatePostWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn, isAdmin})=>(
                    <CreatePost
                        {...props}
                        isLoggedIn={isLoggedIn}
                        isAdmin = {isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default CreatePostWithContext