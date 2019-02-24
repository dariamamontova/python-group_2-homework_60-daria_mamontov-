import React, {Component} from 'react';
import axios from 'axios';


class Borders extends Component {
    state = {
        loadedCountryCode: null,
        borderCountries: null
    };

    componentDidUpdate() {
        const loadedCountry = this.state.loadedCountryCode;
        const newCountryCode = this.props.code;

        if (newCountryCode) {
            if (!loadedCountry || newCountryCode !== loadedCountry) {
                axios.get('alpha/' + this.props.code + '?fields=borders').then(response => {
                    const requests = response.data['borders'].map(country => {
                        return axios.get('alpha/' + country).then(response => {
                            return {...country, name: response.data.name};
                        });
                    });

                    return Promise.all(requests);
                }).then(countries =>
                    this.setState({borderCountries: countries, loadedCountryCode: this.props.code})
                ).catch(error => {
                    console.log(error);
                });
            }
        }
    }

    render() {
        console.log(this.state.borderCountries)
        return (
            this.state.loadedCountryCode ?
                <div className="mt-3">
                    <p className="font-weight-bold">Borders with:</p>
                    <ul>
                    {this.state.borderCountries.map(country => (
                        <li key={country.name}>{country.name}</li>
                    ))}
                    </ul>
                </div> : null
        );
    }
}

export default Borders;