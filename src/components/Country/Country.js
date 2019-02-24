import React, {Component} from 'react';

class Country extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.name !== this.props.name
    }

    render() {
        return (
            <div>
                <h4 onClick={this.props.clicked}>{this.props.name}</h4>
            </div>
        );
    }
}

export default Country;