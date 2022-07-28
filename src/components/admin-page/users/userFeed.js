import react from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function UserFeed() {
    const [users, setUsers] = useState([]);
    axios.get('http://localhost:5000/feed').then(res => {
        console.log(res.data)
        setUsers(res.data)} ).catch(err => console.log(err));
    return (<div>
                <h1>Users</h1>
                <User users={users}/>
            </div>)
}

export function User(props) {
    return (<div></div>)
}