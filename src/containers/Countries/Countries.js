import React, {Component, Fragment} from 'react';
import Country from '../../components/Country/Country';
import axios from 'axios';
import CountryDetail from '../../components/CountryDetail/CountryDetail'

class Countries extends Component {
    state = {
        countries: [],
        selectedCountry: null
    };

    componentDidMount() {
        axios.get('all?fields=name;alpha3Code').then(response => {
            const requests = response.data.map(country => {
                return axios.get('alpha/' + country.alpha3Code).then(response => {
                    return {...country, details: response.data};
                });
            });

            return Promise.all(requests);
        }).then(countries =>
            this.setState({countries})
        ).catch(error => {
            console.log(error);
        });
    }

    countryClicked = (alpha3Code) => {
        this.setState({
            ...this.state,
            selectedCountry: alpha3Code
        });
    };

    render() {
        return (
            <Fragment>
                <section className="row m-5">
                <section className="col-sm-4">
                    {this.state.countries.map(country => (
                        <Country
                            key={country.name}
                            name={country.name}
                            clicked={() => this.countryClicked(country.alpha3Code)}
                        />
                    ))}
                </section>
                 <section className="col-sm-6">
                    <CountryDetail code={this.state.selectedCountry}/>
                </section>
                    </section>
            </Fragment>

        )
    }
}

export default Countries