import {post} from './crud';

class AutheticationService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/auth';
        this.loginUrl = `${this.baseUrl}/login`;
        this.signupUrl = `${this.baseUrl}/signup`;
    }
    
    login(credentials) {
        return post(this.loginUrl,credentials);
    }

    register(credentials) {
        return post(this.signupUrl,credentials);
    }
}

export default AutheticationService
