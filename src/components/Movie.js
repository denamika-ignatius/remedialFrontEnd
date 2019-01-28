import React, { Component } from 'react';
import axios from 'axios';

class Movie extends Component {
    state = { listMovie: [], selectedIdEdit: 0 }
    componentDidMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        axios.get('http://localhost:1997/getListMovie')
            .then((res) => {
                this.setState({ listMovie: res.data, selectedIdEdit: 0 })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var tahun = this.refs.tahunAdd.value;
        var description = this.refs.descAdd.value;

        axios.post('http://localhost:1997/addMovie', {
                nama, tahun, description
            }).then((res) => {
                this.getMovieList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:1997/deleteMovie/' + id)
                .then((res) => {
                    this.getMovieList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var tahun = this.refs.tahunEdit.value;
        var description = this.refs.descEdit.value;

        axios.put('http://localhost:1997/editMovies/' + id, {
            nama, tahun, description
        }).then((res) => {
            this.getMovieList();
        }).catch((err) => {
            console.log(err);
        })
    }

    renderBodyMovie = () => {
        var listJSXMovie = this.state.listmovie.map(({ id, nama, tahun,description}) => {
            if(id !== this.state.selectedIdEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{tahun}</td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ selectedIdEdit: id })} /></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr> )
            }
            
            return (
                <tr>
                    <td>{id}</td>
                    <td>
                        <input 
                            type="text" 
                            defaultValue={nama}
                            ref="namaEdit"
                        />
                    </td>
                    <td>
                    <input 
                            type="number" 
                            defaultValue={tahun}
                            ref="tahunEdit"
                        />
                    </td>
                    <td>
                        <textarea 
                            defaultValue={description}
                            ref="descEdit"
                        ></textarea>
                    </td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectedIdEdit: 0 })} /></td>
                </tr> )
            
        })
        return listJSXMovie;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Manage Movie</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Tahun</th>
                                <th>Description</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyMovie()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <input ref="namaAdd" type="text" placeholder="Nama Product" />
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        ref="tahunAdd"
                                    />
                                </td>
                                <td>
                                    <textarea ref="descAdd" placeholder="Enter the Description here"></textarea>
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

export default Movie;