import React, { Component } from 'react';
import axios from 'axios';

class Category extends Component {
    state = { listCategory: [], selectedIdEdit: 0 }
    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList = () => {
        axios.get('http://localhost:1997/getListCategories')
            .then((res) => {
                this.setState({ listCategory: res.data, selectedIdEdit: 0 })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;

        axios.post('http://localhost:1997/addCategories', {
                nama
            }).then((res) => {
                this.getCategoryList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:1997/deleteCategorie/' + id)
                .then((res) => {
                    this.getCategoryList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;

        axios.put('http://localhost:1997/editCategory/' + id, {
            nama
        }).then((res) => {
            this.getCategoryList();
        }).catch((err) => {
            console.log(err);
        })
    }

    renderBodyCategory = () => {
        var listJSXCategory = this.state.listCategory.map(({ id, nama}) => {
            if(id !== this.state.selectedIdEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
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
                    </td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectedIdEdit: 0 })} /></td>
                </tr> )
            
        })
        return listJSXCategory;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Manage Category</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyCategory()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <input ref="namaAdd" type="text" placeholder="Nama Product" />
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

export default Category;