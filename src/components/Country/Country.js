import React, {Component} from 'react';
import './Country.css';

class Country extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.name !== this.props.name
    }

    render() {
        return (
            <div>
                <p onClick={this.props.clicked}>{this.props.name}</p>
            </div>
        );
    }
}

export default Country;