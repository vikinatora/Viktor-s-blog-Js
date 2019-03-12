import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CommentsService from '../services/comments-service';
import {UserConsumer} from '../components/context/user';

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state={
            error:'',
            content:'',
            postId: this.props.postId
        }

    }

    static service = new CommentsService();
    
    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
        const {content} = this.state;
        const {postId, username} = this.props;
        
        event.preventDefault();

        const data = {
            content,
            post:postId,
            username
        }

        this.setState({
            content:'',
            error:''
        }, async ()=>{
            try{
                const result = await CommentForm.service.createComment(data);

                if(!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }
                this.props.updateComments();

            } catch(err) {
                this.setState({
                    error:err.message
                })
            }
        });
    }

    render() {
        let {content,error} = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
            {
                error.length
                ? <div>Something went wrong : {error}</div>
                :null
            }
            <Form.Group controlId="content">
                <Form.Control 
                    type="text" 
                    as="textarea" rows="3" 
                    onChange={this.handleChange} 
                    value={content} 
                    placeholder="Write a comment" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        )
    }
}
const CommentFormWithContext = ({postId, updateComments}) =>{
    return (
        <UserConsumer>
            {
                (props)=>(
                    <CommentForm
                        postId={postId}
                        updateComments={updateComments}
                        {...props}
                    />
                )
            }
        </UserConsumer>
    );
}
export default CommentFormWithContext