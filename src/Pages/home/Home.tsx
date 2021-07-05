import React from 'react';
import './index.css';
import TwitterLogin from 'react-twitter-auth';
import { Topic } from '../../types/enums';
import JS from "../../assets/images/topics/JS.png"


const Home = () => {
  const onFailed = (test: any) => {
    const token = test;
  };

  const onSuccess = (test: any) => {
    const token = test;
  };
  return (
    <div className="home-container">
      <div className="topic-container">
        {Object.values(Topic).map((item, i) => {
          if (typeof item === "string") {
            return (
              <div className="topic-item-container" key={i}>
                <div className="topic-item" >
                  <img className="productImage" src={JS} alt="" />
              </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default Home;
