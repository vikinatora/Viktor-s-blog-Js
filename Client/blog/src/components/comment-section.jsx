import React, {Component, Fragment} from 'react';
import $ from 'jquery';
import CommentsService from '../services/comments-service';
import CommentForm from './comment-form';
import Button from 'react-bootstrap/Button';
import Comment from './comment';
import {UserConsumer} from './context/user';

class CommentSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments:[],
            error:'',
            postId: this.props.post,
            showHideButton:'Show',
            commentsCount:0
        }
        
        this.updateComments = this.updateComments.bind(this);
        this.showHideComments = this.showHideComments.bind(this);
        this.updateCommentButton = this.updateCommentButton.bind(this);

    }
    static service = new CommentsService();

    async updateComments() {
        let postId = this.state.postId || this.postId;
        let comments = await CommentSection.service.getComments(postId);
        let commentsCount = comments.length;
        this.setState({
            comments,
            commentsCount
        })
    }
    
    showHideComments() {
        this.$el.toggle();
        console.log(this.$el);
    }

    updateCommentButton() {
        let showHideButton = this.state.showHideButton ==='Show' ? 'Hide' : 'Show'
        
        this.setState({
            showHideButton
        })
    }

    async componentDidMount() {
        this.$el = $(this.el);
        this.updateComments();
        this.$el.toggle();
    }

    render() {
        let {comments, postId, showHideButton} = this.state;
        let {isLoggedIn} = this.props;

        return ( 
            <Fragment>
                {
                    this.state.commentsCount
                    ? <h3>{this.state.commentsCount} Comments <Button onClick={() => { this.showHideComments(); this.updateCommentButton();}}>{showHideButton}</Button> </h3>
                    : <h3> No comments yet. :(</h3>
                }
                <div className="comments" ref={el => this.el = el}>
                {
                    comments.map(comment=> (
                        <ul key={comment._id}>
                            <Comment isLoggedIn={isLoggedIn} updateComments={this.updateComments} comment={comment}></Comment>
                        </ul>
                        
                    ))
                   
                }
                </div>
                {
                    isLoggedIn
                    ?<CommentForm postId={postId} updateComments={this.updateComments}/>
                    :<h5>Please log in in order to leave a comment</h5>
                }
                <hr></hr>
            </Fragment>
        )
    }
}

const CommentSectionWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn})=>(
                    <CommentSection
                        {...props}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    );
}

export default CommentSectionWithContext;
