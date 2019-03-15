import React, {Component, Fragment} from 'react';
import CategoryService from '../services/categories-service';
import Post from '../components/post'

class PostsByCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            category:''
        }
    }

    static service = new CategoryService();

    async componentDidMount() {
        let category = this.props.match.params.name;

        let posts = await PostsByCategory.service.findPostsByName(category);

        this.setState({
            posts,
            category
        })
    }

    render() {
        let {posts, category} = this.state;

        return(
            <div className="container fluid">
                    
                        {
                            !posts.length
                            ?
                            <h1>Couldn't find any posts under the "{category}" category</h1>
                            :
                            <Fragment>
                                <h1>Found {posts.length} posts with "{category}" category:</h1>
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

export default PostsByCategory