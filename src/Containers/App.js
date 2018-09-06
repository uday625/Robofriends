import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css'

import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField:state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor(){
        super();
        this.state={
            robots: []//,
            //searchfield: ''            
        }
    }

    componentDidMount(){
        //console.log(this.props.store.getState());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            return response.json();
        })
        .then(users =>{
            this.setState({robots:users});
        })
        
    }

    // onSearchChange = (event)=>{
    //     this.setState({searchfield: event.target.value})
    // }

    render(){

        const {robots } = this.state;
        const {searchField, onSearchChange} = this.props
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if(robots.length === 0){
            return <h1>Loading</h1>
        }else{
            return(
                <div className="tc">            
                    <h1 className='f1' >RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);