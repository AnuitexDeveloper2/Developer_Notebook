import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GetAppointmentsByTopic } from '../../redux/actions/appointntment';
import { getContentByAppointment } from '../../redux/actions/content';
import { Record, ContentItem } from '../../types/content';

import './index.css';

const TopicPage: FC = () => {
  const dispatch = useDispatch();
  const params: any = useParams();

  const [state, setState] = useState({
    appointments: Array<Record>(),
    content: Array<ContentItem>(),
  });

  useEffect(() => {
    getAppointments(params.id);
  }, []);

  const getContentByTopic = async () => {
    dispatch(getContentByAppointment());
  };

  const getAppointments = async (topicId: string) => {
    const result: any = await dispatch(GetAppointmentsByTopic(topicId));
    if (result.length) {
      const content: any = await dispatch(
        getContentByAppointment(result[0]._id, topicId),
      );
      setState({ ...state, appointments: result, content: content });
    }
  };

  return (
    <main className="topic-page-wrapper">
      <aside className="sidebar" style={{ height: window.innerHeight - 63 }}>
        <nav className="nav">
          <ul>
            {state.appointments.map((item: Record) => {
              return (
                <li key={item._id} className="list active">
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
              <div className='content-description'>{item.description}</div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default TopicPage;
