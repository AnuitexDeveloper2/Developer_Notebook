import { ChangeEvent, FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  createContentAction,
  editContentAction,
} from "../../redux/actions/content";
import { ContentItem, Record, Topic } from "../../types/content";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./index.css";
import { alertService } from "../../services";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionResponse } from "../../models/response/types";
import {
  createAppointmentAction,
  editAppointmentAction,
  getAppointmentsByTopicAction,
  removeAppointmentAction,
} from "../../redux/actions/appointntment";

interface Props {
  content: ContentItem | null;
  onClose: () => void;
  topic: Topic | null;
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
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State>({
    title: "",
    description: "",
    appointment: null,
    appointments: [],
  });

  const [editAppointment, setEditAppointment] = useState(true);

  const selector = useAppSelector((state) => state);
  const { contentReducer } = selector;

  const [editedContent, setContent] = useState<ContentState>({
    content: null,
    selectedTopic: null,
  });

  const switchInput = async () => {
    setEditAppointment(!editAppointment);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!topic) {
      return;
    }
    const { payload } = (await dispatch(
      getAppointmentsByTopicAction(topic._id)
    )) as any;
    if (content) {
      const index = payload.findIndex(
        (x: any) => x._id === content.appointment
      );
      if (index !== -1) {
        payload.splice(0, 0, payload.splice(index, 1)[0]);
      }
    }
    setState({
      ...state,
      appointments: payload,
      appointment: payload[0],
      title: content ? content.title : "",
      description: content ? content.description : "",
    });
  };

  const addAppointment = async () => {
    let result: any;
    if (!topic || !state.appointment) {
      return;
    }
    if (editAppointment) {
      result = (await dispatch(
        editAppointmentAction(state.appointment as any)
      )) as unknown as ActionResponse<any>;
    } else {
      const { payload } = (await dispatch(
        createAppointmentAction({
          title: state.appointment.toString(),
          topic: topic?._id,
        })
      )) as unknown as ActionResponse<any>;
      result = payload;
    }
    if (result.error) {
      alertService.error(result.error, { fade: false });
    }
    if (result.data) {
      await getAppointments();
    }
  };

  const onSubmit = async () => {
    const newContent = {
      ...state,
      topic: topic?._id,
      appointment: state.appointment?._id,
    };
    if (!content) {
      const { payload } = await dispatch(createContentAction(newContent));
      if (payload) {
        onClose();
      }
    } else {
      const { payload } = (await dispatch(
        editContentAction({
          title: state.title,
          description: state.description,
          appointment: state.appointment?._id || "",
          id: content._id,
        })
      )) as ActionResponse<ContentItem>;
      debugger;
      if (payload.data) {
        onClose();
      }
    }
  };

  const handleAppointment = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentAppointment = state.appointments.find(
      (item) => item._id === event.target.value
    );
    if (currentAppointment) {
      setState({ ...state, appointment: currentAppointment });
    }
  };

  const removeAppointment = async () => {
    if (state.appointment) {
      const result: any = await dispatch(
        removeAppointmentAction(state.appointment?._id)
      );
      if (result) {
        await getAppointments();
      }
    }
  };

  return (
    <Box padding="10px">
      <div className="add-topic-title">
        <div>{content ? "Edit" : "New"} Content</div>
      </div>
      <Box display={{ sm: "block", md: "flex" }} justifyContent="flex-start">
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
                  {state.appointments.map((item, i) => {
                    return <option value={i}>{item.title}</option>;
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
                  value={state.appointment ? state.appointment.title : ""}
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
                  {editAppointment ? "Edit " : "Add "}appointment
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
              {/* <div id="options">
                {contentReducer.topics.map((item) => {
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
              </div> */}
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
