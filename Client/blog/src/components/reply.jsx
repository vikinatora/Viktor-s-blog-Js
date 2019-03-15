import React, {Component, Fragment} from 'react';

class Reply extends Component {
    render() {
        let {reply} = this.props;
        return (
            <Fragment>
                 <div className="media-body">
                <p><strong>{reply.author.username}</strong> at <strong>{reply.dateCreated.slice(11,16)}</strong></p>
                <p style={{"fontSize":"19px"}}>
                    {reply.content}
                </p>
            </div>
            <hr></hr>
            </Fragment>
           
        )
    }
}

export default Reply