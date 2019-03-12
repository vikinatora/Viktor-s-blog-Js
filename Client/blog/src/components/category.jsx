import React, {Component} from 'react';
import ListGroup from'react-bootstrap/ListGroup'

class Category extends Component {
    render() {
        let {category} = this.props;
        return (
            <ListGroup.Item variant="info" href="/category/:name">{category.name}</ListGroup.Item>
        )
    }
}

export default Category;