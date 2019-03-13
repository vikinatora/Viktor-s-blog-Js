import React, {Component} from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import ReplyForm from './reply-form';
import Reply from './reply';
import CommentsService from '../services/comments-service';


class Comment extends Component {
    constructor(props){
        super(props)
        this.state={
            error:'',
            replyCount: this.props.comment.replies.length,
        }
        this.showHideReply = this.showHideReply.bind(this);
        this.toggleText = `Show ${this.state.replyCount} reply`
    }
    static service = new CommentsService();
    
    showHideReply() {
        this.$reply.toggle();
        this.state.toggleText === `Show ${this.state.replyCount} reply`
        ? this.setState({
            toggleText: `Hide replies`
        })
        : this.setState({
            toggleText: `Show ${this.state.replyCount} reply`
        })
        console.log(this.state.toggleText);
    }

    async Upvote(id){
        try{
            if(this.props.isLoggedIn) {        
                await Comment.service.upvoteComment(id);
            } else {
                throw new Error('Please log in in order to upvote comments');
            }

        } catch(error) {
            this.setState({error})
        }
        
        
    }

    async Downvote(id){
        try{
            if(this.props.isLoggedIn) {        
                await Comment.service.downvoteComment(id);
            } else {
                throw new Error('Please log in in order to downvote comments');
            }

        } catch(error) {
            this.setState({error})
        }
    }

    componentDidMount() {
        this.$reply = $(this.reply)
        this.$reply.toggle();
    }

    render() {
        let {comment, isLoggedIn} = this.props;
        return (
            <div className="media">
                <div className="media-body">
                
                    <p><strong>{comment.author.username}</strong> at <strong>{comment.dateCreated.slice(11,16)}</strong></p>
                    <h4>{comment.content}</h4>
                                
                    <Button variant="info" className="btn btn-sm btn-default" onClick={async ()=>{

                        await this.Upvote(comment._id);
                        this.props.updateComments();
                        }}>
                        <span className="glyphicon glyphicon-thumbs-up"></span>{comment.upvotes? comment.upvotes.length : 0} 👍 Upvote
                    </Button>
                    <Button variant="info" className="btn btn-sm btn-default" onClick={async ()=>{
                        await this.Downvote(comment._id);
                        this.props.updateComments();
                    }}>
                        <span className="glyphicon glyphicon-thumbs-down"></span>{comment.downvotes ? comment.downvotes.length : 0} 👎 Downvote
                    </Button>
                    {
                        <Button className="btn btn-sm btn-default" onClick={()=>this.showHideReply()}>
                            <span className="glyphicon glyphicon-comment"> </span> 
                            {this.toggleText}
                        </Button>
                    }
                    <div className="reply-form" ref={reply => this.reply = reply}>
                    {
                        
                        comment.replies.map(reply=>(
                            <ul key={reply._id}>
                                <Reply reply={reply}></Reply>
                            </ul>
                        ))
                    }
                    {
                        isLoggedIn
                        ? <ReplyForm commentId={comment._id} updateComments={this.props.updateComments}></ReplyForm>
                        : <h5>Please log in in order to leave a reply</h5>
                    }
                   
                    
                    </div>
                    <hr></hr>
                </div>
            </div>
        )
    }
}

export default Comment;
