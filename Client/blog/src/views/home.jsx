import React, {Fragment} from 'react';
import PostService from '../services/posts-service';
import Post from '../components/post';
import Jumbotron from 'react-bootstrap/Jumbotron'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
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
                <div  className="container">
                        {
                            !posts.length
                            ?
                            <Jumbotron fluid>
                            <h1>Welcome to my blog!</h1>
                            <p>
                                Unfotunately, I'm still working on my first post. That is the reason you are seeing this message but don't worry, the first article is coming really soon!
                            </p>
                            </Jumbotron>
                            :
                            <div id="post" className="col-lg-8 fluid" style={{"display": "inline-block"}}  >
                            {
                                posts.map(post => 
                                    <ul key={post._id}>
                                        <Post post={post}/>
                                    </ul>)
                            }      
                            </div>
                        }
                    
                </div>

            </Fragment>
                
        );
    }
}

export default Home;