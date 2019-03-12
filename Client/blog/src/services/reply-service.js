import {post} from './crud';

class ReplyService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/reply';
        this.createUrl = `${this.baseUrl}/create`;
    }

    CreateReply(data) {
        return post(this.createUrl,data);
    }
}

export default ReplyService