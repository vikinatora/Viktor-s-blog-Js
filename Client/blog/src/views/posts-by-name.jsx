import React, {Component, Fragment} from 'react';
import Post from '../components/post'
import PostsService from '../services/posts-service';

class PostsByName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            query:''
        }
    }

    static service = new PostsService();

    async componentDidMount() {
        let query = this.props.match.params.name;

        let posts = await PostsByName.service.getPostsByName(query);
        console.log(posts);
        posts.data = posts.data.filter(post=>post.title.includes(query));
        console.log(posts.data);
        this.setState({
            posts:posts.data,
            query
        })
    }

    render() {
        let {posts, query} = this.state;

        return(
            <div className="container fluid">
                {
                    !posts.length
                    ?
                    <h1>Couldn't find any posts with "{query}" in their titles</h1>
                    :
                    <Fragment>
                        <h1>Matched {posts.length} posts with "{query}":</h1>
                            <div id="post" className="col-lg-8" >
                            {
                                posts.map(post => 
                                <ul key={post._id}>
                                    <Post post={post}/>
                                </ul>)
                            }
                            </div>
                    </Fragment>              
                }
                </div>
        )
    }
    
}

export default PostsByName