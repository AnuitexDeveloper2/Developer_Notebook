import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { CreateContent, EditContent } from '../../redux/actions/content';
import { ContentItem, Topic } from '../../types/content';
import { AppState } from '../../redux/reducers/rootReducer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { EditAppointment, CreateAppointment, RemoveAppointment, GetAppointmentsByTopic } from "../../redux/actions/appointntment/index";

import './index.css';

interface Props {
  content: ContentItem | null;
  onClose: () => void;
  topic: Topic;
}

interface ContentState {
  content: ContentItem | null;
  selectedTopic: Topic | null;
}

const AddContent: FC<Props> = ({ content, onClose, topic }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: '',
    description: '',
    appointment: '',
  });

  const [editAppointment, setEditAppointment] = useState(true);

  const topics = useSelector((state: AppState) => state.content.topics);
  const appointments = useSelector(
    (state: AppState) => state.appointment.appointments,
  );

  const [editedContent, setContent] = useState<ContentState>({
    content: null,
    selectedTopic: null,
  });

  const switchInput = async () => {
    setEditAppointment(!editAppointment);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (content) {
      setContent({ ...editedContent, content: content, selectedTopic: topic, });
      setState({...content, appointment: appointments[0].title});
    } else {
      setContent({ ...editedContent, selectedTopic: topic });
      setState({...state, appointment: appointments[0].title})
    }
  }, [content]);

  const handleSelect = (topic: Topic) => {
    setContent({ ...editedContent, selectedTopic: topic });
  };

  const addAppointment = async() => {
    let result = false
    if (editAppointment) {
     result = await dispatch(EditAppointment()) as any
    } else {
     result = await dispatch(CreateAppointment(state.appointment, topic._id)) as any
    }
    if (result) {
      await dispatch(GetAppointmentsByTopic(topic._id))
    }
  }

  const onSubmit = async () => {
    const newContent = { ...state, topic: topic._id };
    if (!content) {
      const createdContent: any = await dispatch(CreateContent(newContent));
      if (createdContent) {
        onClose();
      }
    } else {
      const result: any = await dispatch(
        EditContent(newContent, editedContent.content._id),
      );
      if (result) {
        onClose();
      }
    }
  };

  return (
    <Box padding="10px">
      <div className="add-topic-title">
        <div>{content ? 'Edit' : 'New'} Content</div>
      </div>
      <Box display={{ sm: 'block', md: 'flex' }} justifyContent="flex-start">
        <div>
          <div className="add-topic-name">
            <div>Title</div>
            <div>
              <input
                defaultValue={state.title}
                name="title"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="add-topic-name">
            <div>Appointment</div>
            <div>
              <div className="appointment-item">
                <select name="select">
                  {/* <option value="value1">Значение 1</option>
                  <option value="value2" selected>
                    Значение 2
                  </option>
                  <option value="value3">Значение 3</option> */}
                  {appointments.map((item) => {
                    return (
                      <option value={item._id} selected>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
                {/* <div> */}
                <HighlightOffIcon
                  className="remove-image-icon"
                  // onClick={() => openRemove(item)}
                />
                {/* </div> */}
              </div>

              <div className="appointment-item">
                <input
                  className="appointment-input"
                  defaultValue={state.appointment}
                  name="appointment"
                  onChange={handleChange}
                />
                <button
                  className="transparent-btn"
                  name="addTopicModal"
                  onClick={switchInput}
                >
                  <AddCircleOutlineIcon />
                </button>
              </div>

              <div className="appointment-item">
                {editAppointment}
                <button onClick={addAppointment}>{editAppointment ? 'Edit ' : 'Add '}appointment</button>
              </div>
            </div>
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
        </div>
        <div className="content-topic-select">
          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button" />
              <div id="select-button" className="brd">
                <div id="selected-value">
                  {editedContent.selectedTopic && (
                    <span>{editedContent.selectedTopic.title}</span>
                  )}
                </div>
                <div id="chevrons">
                  <i className="fas fa-chevron-up"></i>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="options">
                {topics.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="option"
                      onClick={() => handleSelect(item)}
                    >
                      <input
                        className="s-c top"
                        type="radio"
                        name="platform"
                        value="codepen"
                      />
                      <input
                        className="s-c bottom"
                        type="radio"
                        name="platform"
                        value="codepen"
                      />
                      <span className="label">{item.title}</span>
                      <span className="opt-val">{item.title}</span>
                    </div>
                  );
                })}
                <div id="option-bg"></div>
              </div>
            </div>
          </form>
        </div>
      </Box>

      <div className="add-topic-submit">
        <button className="btn btn-danger" type="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </Box>
  );
};

export default AddContent;
