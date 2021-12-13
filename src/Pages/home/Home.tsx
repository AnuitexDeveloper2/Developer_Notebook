import React, { useEffect } from 'react';
import './index.css';
import TwitterLogin from 'react-twitter-auth';
import { Topic } from '../../types/enums';
import JS from '../../assets/images/topics/JS.png';
import { useDispatch, useSelector } from 'react-redux';
import { GetTopics } from '../../redux/actions/topic';
import { AppState } from '../../redux/reducers/rootReducer';

const Home = () => {
  const dispatch = useDispatch();
  const contentSelector = useSelector((state: AppState) => state.content);

  useEffect(() => {
    dispatch(GetTopics());
  }, []);

  const goToTopic = (topicId: string) => {
    window.location.href = `/topic/${topicId}`
  };
  return (
    <div className="home-container">
      <div className="topic-container">
        {contentSelector.topics.map((item, i) => {
          return (
            <div
              className="topic-item-container"
              key={item._id}
              onClick={() => goToTopic(item._id)}
            >
              <div className="topic-item">
                <img
                  className="productImage"
                  src={`https://topic-images1.s3.eu-central-1.amazonaws.com/${item.img}`}
                  alt={item.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
