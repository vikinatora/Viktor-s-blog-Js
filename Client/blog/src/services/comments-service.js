import {post,get, put} from './crud';

class CommentsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/comment';
        this.createUrl = `${this.baseUrl}/create`;
        this.createReplyUrl = `${this.baseUrl}/createreply`
        this.getPostUrl = `${this.baseUrl}/post/`
        this.upvoteUrl = `${this.baseUrl}/upvote`
        this.downvoteUrl = `${this.baseUrl}/downvote`
    }
    
    createComment(data) {
        return post(this.createUrl,data);
    }

    createReply(data) {
        return post(this.createReplyUrl,data);
    }

    getComments(id) {
        return get(`${this.getPostUrl}${id}`);
    }

    upvoteComment(id) {
        return put(`${this.upvoteUrl}/${id}`);
    }
    
    downvoteComment(id) {
        return put(`${this.downvoteUrl}/${id}`);
    }

}

export default CommentsService