import {post, get, put, remove} from './crud';

class PostsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/post';
        this.createUrl = `${this.baseUrl}/create`;
        this.editUrl = `${this.baseUrl}/edit`;
        this.getUrl = `${this.baseUrl}/all`;
        this.searchUrl = `${this.baseUrl}/search`;
        this.deleteUrl = `${this.baseUrl}/delete`;
    }
    
    createPost(data) {
        return post(this.createUrl,data);
    }
    editPost(data) {
        let id = data.id;
        return put(`${this.editUrl}/${id}`,data);
    }
    deletePost(id) {
        return remove(`${this.deleteUrl}/${id}`);
    }

    getPosts() {
        return get(this.getUrl);
    }

    getPost(id) {
        return get(`${this.baseUrl}/${id}`);
    }

    getPostsByName(name) {
        return get(`${this.searchUrl}/${name}`)
    }

}

export default PostsService
