import { Box } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { sendMultipart } from "../../../helper/request";
import { ActionResponse } from "../../../models/response/types";
import { createTopicAction, editTopicAction } from "../../../redux/actions/topic";
import { useAppDispatch } from "../../../redux/store";
import { AddTopicName } from "../../../styles/common.styles";
import { Topic } from "../../../types/content";
import { AddTopicTitle } from "./AddTopic.styles";

interface Props {
  addAndClose: (newTopic: Topic) => void;
  topic: Topic | null;
}

const AddTopic: FC<Props> = ({ addAndClose, topic }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    imagesArray: new Array<any>(),
    preview: "",
    title: "",
    description: "",
    image: "",
    id: "",
  });

  useEffect(() => {
    if (topic) {
      setState({
        ...state,
        title: topic.title,
        description: topic.description,
        image: topic.img as any,
        id: topic._id,
      });
    }
  }, [topic]);
  const setImage = (event: any) => {
    setState({
      ...state,
      imagesArray: [...state.imagesArray, ...event.target.files],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const newTopic = {
      title: state.title,
      description: state.description,
    };
    let result;
    if (!topic) {
      const { payload } = (await dispatch(
        createTopicAction(newTopic)
      )) as ActionResponse<any>;
      sendImage(payload.data._id);
      if (!payload.data) {
        return;
      }
      result = payload.data;
    } else {
      const editedTopic = { ...newTopic, img: state.image };
      const { payload }: any = await dispatch(
        editTopicAction({ ...editedTopic, _id: state.id })
      );
      if (payload) {
        result = payload;
      }
      if (state.preview) {
        sendImage(result?._id);
      }
    }
    addAndClose(result);
  };

  const sendImage = async (id: string) => {
    let formData = new FormData();
    if (state.imagesArray.length > 0) {
      formData.append("image", state.imagesArray[0]);
      await sendMultipart(formData, id);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return (
    <Box padding="10px">
      <AddTopicTitle>
        <div>{topic ? "Edit" : "New"} Topic</div>
      </AddTopicTitle>
      <div>
        <AddTopicName>
          <div>Title</div>
          <div>
            <input
              defaultValue={state.title}
              name="title"
              onChange={handleChange}
            />
          </div>
        </AddTopicName>
        <div
          className={`add-topic-image ${
            state.preview ? "with-image" : "without-image"
          }`}
        >
          <div>Image</div>
          <input
            className=""
            type="file"
            name="imagesArray"
            onChange={setImage}
          />
          {state.preview && (
            <img className="topic-img-preview" src={state.preview} />
          )}
          {!state.preview && state.image && (
            <img
              className="topic-img-preview"
              src={`https://topic-images1.s3.eu-central-1.amazonaws.com/${state.image}`}
              alt=""
            />
          )}
        </div>

        <div className="add-topic-image">
          <div>Description</div>
          <div>
            <textarea
              defaultValue={state.description}
              className="add-topic-description"
              name="description"
              id=""
              cols={30}
              rows={10}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="add-topic-submit">
          <button className="btn btn-danger" type="submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Box>
  );
};

export default AddTopic;
