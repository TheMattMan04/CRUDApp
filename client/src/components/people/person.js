import React, {Component} from 'react';
import './people.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Person extends Component {
    constructor() {
        super();

        this.personArr = [];

        this.state = {
            person: []
        }
    }

    componentDidMount() {
        fetch('/people/:phoneNumber')
            .then(
                res => res.json()
                .then(resultItem => {
                    resultItem.person.forEach(element => {
                        this.personArr.push(element);
                    });

                    this.setState({
                        person: this.personArr
                    });
                })
            )
    }

    render() {
        const columns = [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Phone Number",
                accessor: "phoneNumber"
            }
        ]

        return (
            <div>
                <h1 align="center">People</h1>
                <ReactTable
                    columns={columns}
                    data={this.state.people}
                >
                </ReactTable>
            </div>
        )
    }
}

export default Person;