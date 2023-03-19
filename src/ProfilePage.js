import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = ({ match }) => {
    const [user, setUser] = useState(null);

    // Sending request to Server
    const getUser = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/user/${id}`);

            if (response.status === 200) {
                setUser(response.data);
            }
        }catch (err){
            console.log(err.response.data);
        }
    };

    useEffect(()=>{
        const {id}= match.params;
        getUser(id);
    }, [match.params]);

    if(!user) return <div className="ui active loader"></div>;
    return(
        <div className="ui centered card">
            <div class="image">
                <img src={`http://localhost:5000/user/image/$user._id`}/>
            </div>
            <div class="content">
                <h2 class="header">{user.name}</h2>
            </div>
        </div>
    );
};
export default ProfilePage;