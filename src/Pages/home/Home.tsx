import { useEffect, useState } from "react";
import "./index.css";
import { getTopicsAction } from "../../redux/actions/topic";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Topic } from "../../types/content";
import { ActionResponse } from "../../models/response/types";
import { addImagesToTopicItem } from "../../helper/firebase";
import Search from "../../components/common/search/Search";

const Home = () => {
  const dispatch = useAppDispatch();
  const { searchedContent } = useAppSelector((state) => state.contentReducer);
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

  const goToTopic = (topic: Topic) => {
    window.location.href = `/topic/${topic._id}?topic=${topic.title}`;
  };
  return (
    <div className="home-container">
      <div>{searchedContent.length}</div>
      <Search />
      <div className="topic-container">
        {state.topics.map((item) => {
          return (
            <div
              className={`topic-item-container ${
                searchedContent?.length &&
                !searchedContent.some((content) =>
                  content.topic === item._id
                ) ? "opacity" : ""
              }`}
              key={item._id}
              onClick={() => goToTopic(item)}
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
