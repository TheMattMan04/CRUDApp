import React, {Component} from 'react';
import './people.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class People extends Component {
    constructor() {
        super();

        this.peopleArr = [];
        
        this.state = {
            people: []
        }
    }

    componentDidMount() {
        fetch('/people')
              .then(
                res => res.json().
                    then(resultItem => {                        
                        resultItem.people.forEach(element => {
                            this.peopleArr.push(element);
                        });
                        
                        this.setState({
                            people: this.peopleArr
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
        );
    }
}

export default People;
