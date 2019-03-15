import {post, get} from './crud';

class CategoriesService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/category';
        this.createUrl = `${this.baseUrl}/create`;
        this.getUrl = `${this.baseUrl}/all`;
    }
    
    createCategory(data) {
        return post(this.createUrl,data);
    }

    getCategories() {
        return get(this.getUrl);
    }

    findPostsByName(name) {
        return get(`${this.baseUrl}/${name}`);
    }

}

export default CategoriesService