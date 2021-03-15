import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserModel, OrderModel } from '../common/Models'

interface ProfileProps {
    userID: string;
};

const Profile: React.FC<ProfileProps> = props => {
    const [userLoaded, setUserLoaded] = useState<boolean>(false);
    const [oredersLoaded, setOredersLoaded] = useState<boolean>(false);
    const profile = useRef<UserModel>();
    const orders = useRef<OrderModel[]>([]);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/profile/${props.userID}`)
        .then(res => {
            profile.current = res.data;
            setUserLoaded(true);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/orders/${props.userID}`)
        .then(res => {
            orders.current = res.data;
            orders.current = orders.current.map(e => {e.date = new Date(e.date); return e});
            setOredersLoaded(true);
        });
    }, []);

    return (
        <>
            {!(oredersLoaded && userLoaded) && <div className='loader'></div> }
            {(oredersLoaded && userLoaded) && <div className='container mt-3'>
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
                        <div className='col-6'>
                            {orders.current.map((e, i) => (<p key={`orderLink${i}`}><Link to={`/order/${e.id}`}>{e.date.toLocaleDateString()} - {e.id}</Link></p>))}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Profile;
