import { ChangeEvent, FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  createContentAction,
  editContentAction,
} from "../../../redux/actions/content";
import { ContentItem, Record, Topic } from "../../../types/content";
import { alertService } from "../../../services";
import { useAppDispatch } from "../../../redux/store";
import { ActionResponse } from "../../../models/response/types";
import {
  createAppointmentAction,
  editAppointmentAction,
  getAppointmentsByTopicAction,
  removeAppointmentAction,
} from "../../../redux/actions/appointntment";
import {
  AddContentModalTitle,
  AppointmentItem,
  AppointmentSection,
  EditAppointmentButton,
  FormContent,
  NewTitleInput,
  RemoveAppointment,
  SelectAppointmentSection,
  SubmitAddTopic,
} from "./AddContentDialog.styles";
import { AddTopicName } from "../../../styles/common.styles";
import Switcher from "../../../components/common/switcher/Switcher";

interface Props {
  content: ContentItem<Record> | null;
  onClose: () => void;
  topic: Topic | null;
}

interface State {
  title: string;
  description: string;
  appointment: Record | null;
  appointments: Array<Record>;
  newAppointment: string;
}

interface ContentState {
  selectedTopic: Topic | null;
}

const AddContent: FC<Props> = ({ content, onClose, topic }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State>({
    title: "",
    description: "",
    appointment: null,
    appointments: [],
    newAppointment: "",
  });

  const [editAppointment, setEditAppointment] = useState(true);

  const [editedContent, setContent] = useState<ContentState>({
    selectedTopic: null,
  });

  const switchInput = () => {
    setEditAppointment(!editAppointment);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (content) {
      setContent({ ...editedContent, selectedTopic: topic });
    } else {
      setContent({ ...editedContent, selectedTopic: topic });
    }
    getAppointments();
  }, [content]);

  const getAppointments = async () => {
    if (!topic) {
      return;
    }
    const { payload } = (await dispatch(
      getAppointmentsByTopicAction(topic._id)
    )) as ActionResponse<Array<Record>>;
    if (content && payload.data) {
      const index = payload.data.findIndex(
        (x: any) => x._id === content.appointment
      );
      if (index !== -1) {
        payload.data.splice(0, 0, payload.data.splice(index, 1)[0]);
      }
    }
    setState({
      ...state,
      appointments: payload.data || [],
      appointment: payload.data?.length ? payload.data[0] : null,
      title: content ? content.title : "",
      description: content ? content.description : "",
      newAppointment: payload.data?.length ? payload.data[0].title : "",
    });
  };

  const addAppointment = async () => {
    let result: any;
    if (!topic || !state.newAppointment) {
      return;
    }
    if (editAppointment) {
      const { payload } = (await dispatch(
        editAppointmentAction({
          ...state.appointment,
          title: state.newAppointment,
        } as any)
      )) as unknown as ActionResponse<any>;
      result = payload;
    } else {
      const { payload } = (await dispatch(
        createAppointmentAction({
          title: state.newAppointment,
          topic: topic?._id,
        })
      )) as unknown as ActionResponse<any>;
      result = payload;
    }
    if (result?.error) {
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
      )) as ActionResponse<ContentItem<Record>>;
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
      setState({
        ...state,
        appointment: currentAppointment,
        newAppointment: currentAppointment.title,
      });
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
      <AddContentModalTitle>
        <div>{content ? "Edit" : "New"} Content</div>
      </AddContentModalTitle>
      <FormContent>
        <div>
          <AddTopicName>
            <div>Title</div>
            <div>
              <NewTitleInput
                value={state.title}
                name="title"
                onChange={handleChange}
              />
            </div>
          </AddTopicName>
          <AppointmentSection>
            <SelectAppointmentSection>
              <div>Appointment</div>
              <AppointmentItem>
                <select
                  name="select"
                  value={state.appointment?._id}
                  onChange={handleAppointment}
                >
                  {state.appointments.map((item) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
                <div>
                  <RemoveAppointment
                    onClick={removeAppointment}
                    name={"newAppointment"}
                  />
                </div>
              </AppointmentItem>
            </SelectAppointmentSection>

            <SelectAppointmentSection>
              <div />
              <NewTitleInput
                value={state.newAppointment}
                name="newAppointment"
                onChange={handleChange}
              />
              <Switcher onClick={switchInput} value={editAppointment} />
            </SelectAppointmentSection>

            <SelectAppointmentSection>
              <div />
              <EditAppointmentButton
                onClick={addAppointment}
                className={`${editAppointment ? "edit" : "add"}`}
              >
                {editAppointment ? "Edit " : "Add "}appointment
              </EditAppointmentButton>
            </SelectAppointmentSection>
          </AppointmentSection>
          <SelectAppointmentSection>
            <div>Description</div>
            <textarea
              defaultValue={state.description}
              className="add-topic-description"
              name="description"
              id=""
              cols={30}
              rows={10}
              onChange={handleChange}
            ></textarea>
          </SelectAppointmentSection>
        </div>
        <SelectAppointmentSection>
          <div />
          <SubmitAddTopic onClick={onSubmit}>Submit</SubmitAddTopic>
        </SelectAppointmentSection>
      </FormContent>
    </Box>
  );
};

export default AddContent;
