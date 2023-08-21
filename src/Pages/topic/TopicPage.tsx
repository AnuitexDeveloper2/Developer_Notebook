import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActionResponse } from "../../models/response/types";
import { getAppointmentsByTopicAction } from "../../redux/actions/appointntment";
import { getContentByAppointmentIdAction } from "../../redux/actions/content";
import { useAppDispatch } from "../../redux/store";
import { ContentItem, Record } from "../../types/content";
import AppointmentNavBar from "./appointmentNavBar/AppointmentNavBar";
import ContentSection from "./contenSection/ContentSection";
import { TopicPageWrapper } from "./TopicPage.styles";
import { TopicPageState } from "./TopicPage.types";

const TopicPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const [state, setState] = useState<TopicPageState>({
    appointments: Array<Record>(),
    content: Array<ContentItem<string>>(),
    activeAppointment: "",
  });

  useEffect(() => {
    const topicId = params.id;
    if (topicId) {
      getData(topicId);
    }
  }, []);

  const getData = async (topicId: string) => {
    const { payload } = (await dispatch(
      getAppointmentsByTopicAction(topicId)
    )) as ActionResponse<Array<Record>>;
    if (payload.data) {
      setData(payload.data);
    }
  };

  const setData = async (appointments: Array<Record>) => {
    if (appointments.length) {
      const content = await getContent(appointments[0]._id);
      setState({
        ...state,
        appointments: appointments,
        activeAppointment: appointments[0]._id,
        content,
      });
    }
  };

  const selectAppointment = async (event: React.MouseEvent<HTMLLIElement>) => {
    const appointmentId = event.currentTarget.id;
    const content = await getContent(appointmentId);
    setState({ ...state, activeAppointment: appointmentId, content });
  };

  const getContent = async (appointmentId: string) => {
    const { payload } = (await dispatch(
      getContentByAppointmentIdAction(appointmentId)
    )) as ActionResponse<any>;
    return payload.data;
  };

  return (
    <TopicPageWrapper>
      <AppointmentNavBar
        items={state.appointments}
        active={state.activeAppointment}
        selectAppointment={selectAppointment}
      />
      <ContentSection items={state.content} />
    </TopicPageWrapper>
  );
};

export default TopicPage;
