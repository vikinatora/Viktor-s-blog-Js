import React, {Component} from 'react';
import CommentSection from './comment-section';
import Image from 'react-bootstrap/Image'

class Post extends Component {

    render() {
        let {post} = this.props;
        
        return(
            <div className="container-fluid float-left col-sm-8 ">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="page-header">
                            <h1>{post.title}</h1>
                            <p>Posted by <span className="glyphicon glyphicon-user"></span>
                            <a href="#">Viktor Todorov</a> on <span className="glyphicon glyphicon-time">
                            </span>{post.dateCreated.slice(0,10)}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div >

                        {/* <!-- Image --> */}
                        <figure className="margin-b-2">
                            <Image fluid rounded src={post.imageUrl} alt=""/>
                        </figure>

                        <strong>
                            {post.content}
                        </strong>
                        <hr>
                        </hr>

                        {/* COMMENTS */}
                        <div className="well">
                        {
                            <CommentSection post={post._id}/>
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post