import { useEffect, useState } from "react";
import "./index.css";
import { getTopicsAction } from "../../redux/actions/topic";
import { useAppDispatch } from "../../redux/store";
import { Topic } from "../../types/content";
import { ActionResponse } from "../../models/response/types";
import { addImagesToTopicItem } from "../../helper/firebase";

const Home = () => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    topics: Array<Topic>(),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { payload } = (await dispatch(getTopicsAction())) as ActionResponse<
      Array<Topic>
    >;
    if (payload.data) {
      const topics = await addImagesToTopicItem(payload.data);
      setState({ ...state, topics: topics });
    }
  };

  const goToTopic = (topicId: string) => {
    window.location.href = `/topic/${topicId}`;
  };
  return (
    <div className="home-container">
      <div className="topic-container">
        {state.topics.map((item) => {
          return (
            <div
              className="topic-item-container"
              key={item._id}
              onClick={() => goToTopic(item._id)}
            >
              <div className="topic-item">
                <img
                  className="productImage"
                  src={item.imgSrc}
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
