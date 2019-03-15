import React, {Component, Redirect} from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup'
import Button from 'react-bootstrap/Button';
import PostsService from '../services/posts-service';

import toastr from 'toastr';


class SearchForm extends Component {
    constructor(props) {
        super(props)

        this.state={
            queryString:''
        }
    }

    static service = new PostsService();

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = (event) => {
        let{queryString} = this.state
        // return <Redirect href={`post/search/${queryString}`}></Redirect> 
        // this.props.history.push('/login')
        return <Redirect to={`/post/search/${queryString}`}/>
        // if(queryString && queryString!=="")
        // {
        // }
        // event.preventDefault();
        // return;
    }

    render(){ 
        let {queryString} = this.state
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="queryString">
                    <FormControl 
                                type="text" 
                                value={queryString} 
                                onChange={this.handleChange} 
                                placeholder="Search posts" 
                                className="mr-sm-2">
                    </FormControl>
                </FormGroup>
               
			   <Button variant="outline-success" type="submit">Search</Button>
			</Form>
        )
    }
}

export default SearchForm