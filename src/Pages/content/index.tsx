import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  Toolbar,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
  Box,
  TableBody,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './index.css';
import { GetItemsAction, GetTopics, GetTopic } from '../../redux/actions/content';
import { AppState } from '../../redux/reducers/rootReducer';
import TopicItem from './topicItem';
import AddTopic from './addTopic';
import { Topic } from '../../types/content';

interface State {
  content: Array<any>;
  addTopicModal: boolean;
  selectedTopic: Topic | null
}

const Content = () => {
  const dispatch = useDispatch();
  const contentSelector = useSelector((state: AppState) => state.content);
  const [state, setState] = useState<State>({
    content: [],
    addTopicModal: false,
    selectedTopic: null
  });
  useEffect(() => {
    dispatch(GetTopics());
    getContent(contentSelector.topics[0]._id)
  }, [GetTopics]);

  const getContent = (topicId: string) => {
    dispatch(GetItemsAction(topicId))
  }

  const openAddTopic = () => {
    setState({ ...state, addTopicModal: true })
  };

  const closeCreateTopicModal = () => {
    dispatch(GetTopics());
    setState({ ...state, addTopicModal: false, selectedTopic: null })
  }

  const editTopic = async (topicId: string) => {
    debugger
    const topic = await dispatch(GetTopic(topicId)) as any
    if (topic) {
      setState({...state, selectedTopic: topic, addTopicModal: true})
    }
  }

  const removeTopic = async (topicId: string) => {

  }

  return (
    <Card className="content-card">
      <Card className="topic-container">
        <div className="topics-section">
          {contentSelector.topics.map((topic, i) => {
            return <TopicItem topic={topic} key={i} removeTopic={removeTopic} editTopic={editTopic} />;
          })}
        </div>
        <div className="add-topic-icon" onClick={openAddTopic}>
          <AddCircleOutlineIcon />
        </div>
        <button className="add-topic" onClick={openAddTopic}>Add Topic</button>
      </Card>
      <TableContainer className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Appointment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentSelector.records.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        fullWidth
        open={state.addTopicModal}
        onClose={closeCreateTopicModal}
        id="add-tickets-dialog"
      >
        <DialogContent>
          <AddTopic topic={state.selectedTopic} addAndClose={closeCreateTopicModal} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Content;
