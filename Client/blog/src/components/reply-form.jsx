import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReplyService from '../services/reply-service';
import {UserConsumer} from '../components/context/user';

class ReplyForm extends Component {
    constructor(props){
        super(props);

        this.state={
            error:'',
            content:'',
            commentId: this.props.commentId
        }

    }

    static service = new ReplyService();
    
    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
        const {content, commentId} = this.state;
        const {username} = this.props;
        console.log(commentId);
        event.preventDefault();

        const data = {
            content,
            comment:commentId,
            username
        }

        this.setState({
            content:'',
            error:''
        }, async ()=>{
            try{
                const result = await ReplyForm.service.CreateReply(data);

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
                    as="textarea" rows="1" 
                    onChange={this.handleChange} 
                    value={content} 
                    placeholder="Write a reply" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        )
    }
}
const ReplyFormWithContext = ({commentId, updateComments}) =>{
    return (
        <UserConsumer>
            {
                (props)=>(
                    <ReplyForm
                        commentId={commentId}
                        updateComments={updateComments}
                        {...props}
                    />
                )
            }
        </UserConsumer>
    );
}
export default ReplyFormWithContext