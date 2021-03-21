import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserModel } from '../common/Models'
import { UserContext } from '../common/UserContext';

const Profile: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const profile = useRef<UserModel>();

    const userID = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/user/${userID}`)
        .then(res => {
            profile.current = res.data;
            setLoaded(true);
        });
    }, []);

    return (
        <>
            {!loaded && <div className='container'><div className='loader'></div></div>}
            {loaded && <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <h1>Your details:</h1>
                        <div className='row'>
                            <div className='col-6 text-right'>
                                <p>Name:</p>
                                <p>Username:</p>
                                <p>Email:</p>
                                <p>Address:</p>
                                <p>Phone number:</p>
                            </div>
                            <div className='col-6'>
                                <p>{profile.current?.name}</p>
                                <p>{profile.current?.username}</p>
                                <p>{profile.current?.email}</p>
                                <p>{profile.current?.address}</p>
                                <p>{profile.current?.phoneNumber}</p>
                            </div>
                        </div>
                        <div className='text-center'>
                            <Link to='/profile/edit' className='btn btn-primary'>Edit details <i className="fas fa-user-edit"></i></Link>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <h1>Your orders:</h1>
                        <div>
                            {profile.current?.orders.map((e, i) => (<p key={`orderLink${i}`}><Link to={`/order/${e.id}`}>{new Date(e.date).toLocaleDateString()} - {e.id}</Link></p>))}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Profile;
