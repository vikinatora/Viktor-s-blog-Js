import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CommentsService from '../services/comments-service';
import {UserConsumer} from '../components/context/user';
import toastr from 'toastr';

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

    handleSubmit = async (event) => {
        const {content} = this.state;
        const {postId, username} = this.props;
        
        event.preventDefault();

        const data = {
            content,
            post:postId,
            username
        }

        

        try{
            const result = await CommentForm.service.createComment(data);

            if(!result.success) {
                toastr.error(Object.values(result.errors).join(' '),"Problems with posting your comment")
                return
            }
            this.setState({
                content:''
            })
            this.props.updateComments();

        } catch(err) {
            toastr.error(err.message,"Problems with posting your comment")
        }
        
    }

    render() {
        let {content} = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
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