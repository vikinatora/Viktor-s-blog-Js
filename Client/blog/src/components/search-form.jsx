import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup'
import Button from 'react-bootstrap/Button';
import PostsService from '../services/posts-service';

import { UserConsumer } from './context/user';


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

    render(){ 
        let {queryString} = this.state
        return (
            <Form inline>
                <FormGroup controlId="queryString">
                    <FormControl 
                                type="text" 
                                value={queryString} 
                                onChange={this.handleChange} 
                                placeholder="Search posts" 
                                className="mr-sm-2">
                    </FormControl>
                </FormGroup>
               
			   <Button href={`/post/search/${queryString}`} variant="outline-success" type="submit">Search</Button>
			</Form>
        )
    }
}

const SearchFormWithContext = (props) =>{
    return(
        <UserConsumer>
            {
                ()=>(
                    <SearchForm
                        {...props}
                    />
                )
            }
        </UserConsumer>
    )
    
}

export default SearchFormWithContext