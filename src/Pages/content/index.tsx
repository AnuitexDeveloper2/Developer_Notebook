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
import { GetTopics } from '../../redux/actions/content';
import { AppState } from '../../redux/reducers/rootReducer';
import TopicItem from './topicItem';
import AddTopic from './addTopic';

interface State {
  content: Array<any>;
  addTopicModal: boolean;
}

const Content = () => {
  const dispatch = useDispatch();
  const contentSelector = useSelector((state: AppState) => state.content);
  const [state, setState] = useState<State>({
    content: [],
    addTopicModal: false,
  });
  useEffect(() => {
    dispatch(GetTopics());
  }, [GetTopics]);

  const openAddTopic = () => {
    setState({ ...state, addTopicModal: true })
  };

  const closeCreateTopicModal = () => {
    dispatch(GetTopics());
    setState({ ...state, addTopicModal: false })
  }

  return (
    <Card className="content-card">
      <Card className="topic-container">
        <div className="topics-section">
          {contentSelector.topics.map((topic) => {
            return <TopicItem topic={topic} />;
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
            </TableRow>
          </TableHead>
          <TableBody>
          {state.content.map((item, i) => {
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
          <AddTopic addAndClose={closeCreateTopicModal} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Content;
