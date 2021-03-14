import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserModel } from '../common/Models'

interface ProfileProps {
    userID: string;
};

const Profile: React.FC<ProfileProps> = props => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const profile = useRef<UserModel>();

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/profile/${props.userID}`)
        .then(res => {
            profile.current = res.data;
            console.log(profile.current);
            setLoaded(true);
        });
    }, []);

    return (
        <>
            {!loaded && <div className='loader'></div> }
            {loaded && <div className='container mt-3'>
                
            </div>}
        </>
    );
}

export default Profile;
