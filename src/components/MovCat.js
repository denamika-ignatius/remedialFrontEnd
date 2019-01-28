import React, { Component } from 'react';
import axios from 'axios';

class MovCat extends Component {
    state = { listMovCat: [], selectedIdEdit: 0 }
    componentDidMount() {
        this.getMovCatList();
    }

    getMovCatList = () => {
        axios.get('http://localhost:1997/getListMovCat')
            .then((res) => {
                this.setState({ listMovCat: res.data, selectedIdEdit: 0 })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var namaMovies = this.refs.namaAdd.value;
        var namaCategory = this.refs.namaCategory.value;
        axios.post('http://localhost:1997/addMovCat', {
                namaMovies,namaCategory
            }).then((res) => {
                this.getMovCatList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:1997/deleteMovCat/')
                .then((res) => {
                    this.getMovCatList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    renderBodyMovCat = () => {
        var listJSXMovCat = this.state.listMovCat.map(({ namaMovies, namaCategory}) => {
                return (
                    <tr>
                        <td>{namaMovies}</td>
                        <td>{namaCategory}</td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick} /></td>
                    </tr> )
        })
        return listJSXMovCat;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Manage MovCat</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Nama Movie</th>
                                <th>Nama Category</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyMovCat()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <input ref="namaMovies" type="text" placeholder="Nama Movies" />
                                </td>
                                <td>
                                    <input ref="namaCategory" type="text" placeholder="Nama Category" />
                                </td>
                                <td>
                                    <input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} />
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        );
    }
}

export default MovCat;