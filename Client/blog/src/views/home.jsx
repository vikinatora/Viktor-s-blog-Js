import React, {Fragment} from 'react';
import PostService from '../services/posts-service';
import Post from '../components/post';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            categories:[]
        }
    }
    static postService = new PostService();
    
    async componentDidMount(){
        let posts = await Home.postService.getPosts();
        this.setState({
            posts
        })
    }
    render() {
        let {posts} = this.state;

        return (
            <Fragment>
                <div className="container fluid">

                <div id="post" className="col-lg-8" >
                    {
                        posts.map(post => 
                        <ul key={post._id}>
                            <Post post={post}/>
                        </ul>)
                    }
                </div>
                </div>

            </Fragment>
                
        );
    }
}

export default Home;