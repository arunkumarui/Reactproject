import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";


function Crud() {
    const [users, SetUsers] = useState([]);
    const [filterusers, setFilterUsers] = useState([]);
    const [userData, setUserData] = useState({ name: "", age: "", city: "" });

    //popup box here to start
    const [modalopen, setModalopen] = useState(false);

    const getallUsers = async () => {
        await axios.get("http://localhost:8000/users").then((res) => {
            console.log(res.data);
            SetUsers(res.data);
            setFilterUsers(res.data);
        })
    };

    useEffect(() => {
        getallUsers();
    }, [])

    //Addusers here to start
    const Addusers = () => {
        setUserData({ name: "", age: "", city: "" });
        setModalopen(true);
    }

    const hndData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {


        if (userData.id) {
            await axios.patch(`http://localhost:8000/users/{userData.id}`,
                userData).then((res) => {
                    console.log(res);
                })
        } else {
            await axios.post("http://localhost:8000/users",
                userData).then((res) => {
                    console.log(res);
                })
        }
        closemodal();
        setUserData({ name: "", age: "", city: "" });

    }

    //Search function here to start
    const handleSearchChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUsers = users.filter((user) => user.name.
            toLowerCase().includes(searchText) || user.city.
                toLowerCase().includes(searchText));
        setFilterUsers(filteredUsers);
    }

    //Delete function here to start
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want delete this user?");
        if (isConfirmed) {
            await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
                SetUsers(res.data);
                setFilterUsers(res.data);
            })
        }

    }
    // Close function here to start
    const closemodal = () => {
        setModalopen(false);
        getallUsers();
    }

    //Edit Update Record
    const editrecord = (user) => {
        setUserData(user);
        setModalopen(true);

    }

    return (
        <>
            <div className='container'>
                <div className='crud-sec'>
                    <div className='input-search'>
                        <input type='search' placeholder='Search Text' onChange={handleSearchChange} />
                        <button className='ml-2' onClick={Addusers}>Add Record</button>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Aage</th>
                                <th>City</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterusers && filterusers.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.age}</td>
                                        <td>{user.city}</td>
                                        <td><button onClick={() => editrecord(user)} className='bg-g'>Edit</button></td>
                                        <td><button onClick={() => handleDelete(user.id)} className='bg-r'>Delete</button></td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                    {modalopen && (
                        <div className='modal-box'>
                            <div className='modal-content'>
                                <span className='close' onClick={closemodal}> X </span>
                                <h2>{userData.id ? "Update Record" : "Add Record"}</h2>
                                <div className='inputgroup'>
                                    <label htmlFor="name">Full Name</label>
                                    <input required onChange={hndData} value={userData.name} type="text" name="name" id="name" />
                                </div>
                                <div className='inputgroup'>
                                    <label htmlFor="Age">Age</label>
                                    <input required onChange={hndData} value={userData.age} type="number" name="age" id="age" />
                                </div>
                                <div className='inputgroup'>
                                    <label htmlFor="city">City</label>
                                    <input required onChange={hndData} value={userData.city} type="text" name="city" id="city" />
                                </div>

                                <button onClick={handleSubmit} className='bg-g'>{userData.id ? "Update User" : "Add User"}</button>

                            </div>
                        </div>
                    )}



                </div>

            </div>
        </>
    )
}

export default Crud