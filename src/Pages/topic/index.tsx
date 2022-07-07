import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GetAppointmentsByTopic } from '../../redux/actions/appointntment';
import { getContentByAppointment } from '../../redux/actions/content';
import { Record, ContentItem } from '../../types/content';

import './index.css';

interface State {
  appointments: Array<Record>;
  content: Array<ContentItem>;
  activeAppointment: Record;
}

const TopicPage: FC = () => {
  const dispatch = useDispatch();
  const params: any = useParams();

  const [state, setState] = useState<State>({
    appointments: Array<Record>(),
    content: Array<ContentItem>(),
    activeAppointment: undefined,
  });

  useEffect(() => {
    getAppointments(params.id);
  }, []);

  const getContentByActiveAppointment = async (appointment: Record) => {
    const content: any = await dispatch(getContentByAppointment(appointment._id, params.id));
    setState({
      ...state,
      content: content,
      activeAppointment: appointment,
    });
  };

  const getAppointments = async (topicId: string) => {
    const result: any = await dispatch(GetAppointmentsByTopic(topicId));
    if (result.length) {
      const content: any = await dispatch(
        getContentByAppointment(result[0]._id, topicId),
      );
      setState({
        ...state,
        appointments: result,
        content: content,
        activeAppointment: result[0],
      });
    }
  };

  return (
    <main className="topic-page-wrapper">
      <aside className="sidebar" style={{ height: window.innerHeight - 63 }}>
        <nav className="nav">
          <ul>
            {state.appointments.map((item: Record) => {
              return (
                <li
                  key={item._id}
                  onClick={()=> {getContentByActiveAppointment(item)}}
                  className={`list ${
                    item._id === state.activeAppointment._id ? 'active' : ''
                  }`}
                >
                  <a className="topic-theme">{item.title}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <section className="twitter">
        {state.content.map((item) => {
          return (
            <div key={item._id} className="content-item">
              {' '}
              <div className="content-title">
                <strong> {item.title} </strong>
              </div>
              <div className="content-description">{item.description}</div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default TopicPage;
