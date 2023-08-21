import { useEffect, useState } from "react";
import { getTopicsAction } from "../../redux/actions/topic";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Topic } from "../../types/content";
import { ActionResponse } from "../../models/response/types";
import { addImagesToTopicItem } from "../../helper/firebase";
import Search from "../../components/common/search/Search";
import {
  HomeContainer,
  HomeSearchContainer,
  TopicContainer,
  TopicImage,
  TopicItem,
  TopicItemContainer,
} from "./Home.styles";

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
    <HomeContainer>
      <HomeSearchContainer>
        <Search />
      </HomeSearchContainer>
      <TopicContainer>
        {state.topics.map((item) => {
          return (
            <TopicItemContainer
              className={`${
                searchedContent?.length &&
                !searchedContent.some((content) => content.topic === item._id)
                  ? "opacity"
                  : ""
              }`}
              key={item._id}
              onClick={() => goToTopic(item)}
            >
              <TopicItem>
                <TopicImage src={item.imgSrc} alt={item.title} />
              </TopicItem>
            </TopicItemContainer>
          );
        })}
      </TopicContainer>
    </HomeContainer>
  );
};

export default Home;
