import React, {Component} from 'react';
import './Hello.css';

class Hello extends Component {
    render(){
        return(
            <div className='f2 tc'>
                <h1>Hello First react component</h1>
                <p>{this.props.username}</p>
            </div>
        );
    }
}

export default Hello;