import React from 'react';
import "./index.css";
import TwitterLogin from "react-twitter-auth";

const Home = () => {
    const onFailed = (test: any) => {
        const token = test
    }

    const onSuccess = (test: any) => {
        const token = test
    }
    return (
        <div className="home-container">
            <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                onFailure={onFailed} onSuccess={onSuccess}
                requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
                        Home
        </div>
    );

}

export default Home