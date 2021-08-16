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

interface State {
  content: Array<any>;
  addTopicModal: boolean;
}

const Content = () => {
  const dispatch = useDispatch();
  const contentSelector = useSelector((state: AppState) => state.content);
  const [state, setState] = useState<State>({
    content: [{ title: 'react', description: 'test' }],
    addTopicModal: false,
  });
  useEffect(() => {
    dispatch(GetTopics());
  }, []);

  const openAddTopic = () => {
      setState({...state, addTopicModal: true})
  };

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
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
          </TableHead>
          {state.content.map((item) => {
            return (
              <TableBody>
                <TableRow>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </TableContainer>
      <Dialog
        fullWidth
        open={state.addTopicModal}
        // onClose={closeAddTicketsModal}
        id="add-tickets-dialog"
      >
        <DialogContent>
          {/* <AddTickets closeModal={closeAddTicketsModal} id={id} /> */}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Content;
