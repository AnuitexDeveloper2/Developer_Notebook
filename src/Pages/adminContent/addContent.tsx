import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  FormEvent,
  ChangeEventHandler,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { CreateContent, EditContent } from '../../redux/actions/content';
import { ContentItem, Record, Topic } from '../../types/content';
import { AppState } from '../../redux/reducers/rootReducer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  EditAppointment,
  CreateAppointment,
  RemoveAppointment,
  GetAppointmentsByTopic,
} from '../../redux/actions/appointntment/index';

import './index.css';

interface Props {
  content: ContentItem | null;
  onClose: () => void;
  topic: Topic;
}

interface State {
  title: string;
  description: string;
  appointment: Record | null;
  appointments: Array<Record>;
}

interface ContentState {
  content: ContentItem | null;
  selectedTopic: Topic | null;
}

const AddContent: FC<Props> = ({ content, onClose, topic }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    title: '',
    description: '',
    appointment: null,
    appointments: [],
  });

  const [editAppointment, setEditAppointment] = useState(true);

  const topics = useSelector((state: AppState) => state.content.topics);

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
      setContent({ ...editedContent, content: content, selectedTopic: topic });
    } else {
      setContent({ ...editedContent, selectedTopic: topic });
    }
    getAppointments();
  }, [content]);

  const handleSelect = (topic: Topic) => {
    setContent({ ...editedContent, selectedTopic: topic });
  };

  const getAppointments = async () => {
    const result: any = await dispatch(GetAppointmentsByTopic(topic._id));
    if (content) {
      const index = result.findIndex((x: any) => x._id === content.appointment);
      if (index !== -1) {
        result.splice(0, 0, result.splice(index, 1)[0]);
      }
    }
    setState({
      ...state,
      appointments: result,
      appointment: result[0],
      title: content ? content.title : '',
      description: content ? content.description : '',
    });
  };

  const addAppointment = async () => {
    let result = false;
    if (editAppointment) {
      result = (await dispatch(EditAppointment())) as any;
    } else {
      result = (await dispatch(
        CreateAppointment(state.appointment, topic._id),
      )) as any;
    }
    if (result) {
      await getAppointments();
    }
  };

  const onSubmit = async () => {
    const newContent = { ...state, topic: topic._id, appointment: state.appointment._id };
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

  const handleAppointment = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentAppointment = state.appointments.find(
      (item) => item._id === event.target.value,
    );
    setState({ ...state, appointment: currentAppointment });
  };

  const removeAppointment = async () => {
    const result: any = await dispatch(
      RemoveAppointment(state.appointment._id),
    );
    if (result) {
      await getAppointments()
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
                <select name="select" onChange={handleAppointment}>
                  {state.appointments.map((item) => {
                    return (
                      <option value={item._id} >
                        {item.title}
                      </option>
                    );
                  })}
                </select>
                <HighlightOffIcon
                  className="remove-image-icon"
                  onClick={removeAppointment}
                />
              </div>

              <div className="appointment-item">
                <input
                  className="appointment-input"
                  value={state.appointment ? state.appointment.title : ''}
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
                <button onClick={addAppointment}>
                  {editAppointment ? 'Edit ' : 'Add '}appointment
                </button>
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
