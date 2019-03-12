import React, {Component, Fragment} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import PostsService from '../services/posts-service';

class ManagePosts extends Component{
    constructor(props) {
        super(props);

        this.postCounter = 0;
        this.state = {
            posts:[],
            err:''
        }
    }
    static postService = new PostsService();

    async DeleteHandler(postId){
        if(window.confirm('Do you really want to delete this exceptional post?')) {
            try{
                await ManagePosts.postService.deletePost(postId);
                this.setState({
                    posts:this.state.posts.filter(p=>p.id!==postId)
                })

            } catch(err) {
                this.setState({err})
            }
        }
    }

    CreateButtons() {
            let post = this.state.posts[this.postCounter];
            let postId = post.id;
            this.postCounter++;
            return (
                <div>
                    <Fragment>
                    <Button 
                        variant="warning"
                        type="button" 
                        onClick={() => 
                        {
                            this.props.history.push(`/editpost/${postId}`);
                        }}
                    >
                    Edit
                    </Button>
                    <Button 
                        variant="danger"
                        type="button" 
                        onClick={async ()=>{
                            this.DeleteHandler(postId)
                        }}
                    >
                    Delete
                    </Button>
                </Fragment>
                </div>
            )
         }

    async componentDidMount() {
        let posts = await ManagePosts.postService.getPosts();
        let viewButtons = [];

        posts.forEach(post=>{
            let newPost = {
                id:post._id,
                title:post.title,
                category:post.category.name,
                comments:post.comments.length,
                content:post.content,
            }

            viewButtons.push(newPost);
        })

        this.setState({
            posts:viewButtons
        });

    }

    render() {
        this.postCounter = 0;
        let {posts} = this.state;
        return (
            <BootstrapTable striped data={ posts } >
              <TableHeaderColumn dataField='title' isKey>Title</TableHeaderColumn>
              <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
              <TableHeaderColumn dataField='comments'>Comments</TableHeaderColumn>
              <TableHeaderColumn dataField='content'>Content</TableHeaderColumn>
              <TableHeaderColumn dataField='actions' 
                                dataFormat={this.CreateButtons.bind(this)}
             >Actions</TableHeaderColumn>
            </BootstrapTable>
          );
    }
}

export default ManagePosts;