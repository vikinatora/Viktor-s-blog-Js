import React, {Fragment} from 'react';
import PostService from '../services/posts-service';
import CategoriesService from '../services/categories-service';

import Post from '../components/post';
import Category from '../components/category';

import ListGroup from 'react-bootstrap/ListGroup';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            categories:[]
        }
    }
    static postService = new PostService();
    static categoriesService = new CategoriesService();

    async componentDidMount(){
        let posts = await Home.postService.getPosts();
        let categories = await Home.categoriesService.getCategories();

        this.setState({
            posts,
            categories
        })
    }
    render() {
        let {posts, categories} = this.state;

        return (
            <Fragment>
                <div className="categories float-right col-lg-4">
                <ListGroup>
                    <h2>Categories</h2>
                    {
                       
                        categories.map(category => 
                        <ul key={category._id}>
                            <Category category={category}/>
                        </ul>)
                    }
                </ListGroup>
               </div>
                <div className="posts col-lg-8">
                    {
                        posts.map(post => 
                        <ul key={post._id}>
                            <Post post={post}/>
                        </ul>)
                    }
                </div>
            </Fragment>
                
        );
    }
}

export default Home;