import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
  TableBody,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './index.css';
import { GetTopics, GetTopic, RemoveTopicAction } from '../../redux/actions/topic';
import { AppState } from '../../redux/reducers/rootReducer';
import TopicItem from './topicItem';
import AddTopic from './addTopic';
import { ContentItem, Topic } from '../../types/content';
import AddContent from './addContent';
import { GetContent } from '../../redux/actions/content';

interface State {
  content: Array<ContentItem>;
  addTopicModal: boolean;
  addContentModal: boolean;
  selectedTopic: Topic | null;
  selectedContent: ContentItem | null
}

const Content = () => {
  const dispatch = useDispatch();
  const contentSelector = useSelector((state: AppState) => state.content);
  const [state, setState] = useState<State>({
    content: [],
    addTopicModal: false,
    addContentModal: false,
    selectedTopic: null,
    selectedContent: null
  });
  useEffect(() => {
    getContent(contentSelector.topics[0]._id)
  }, [GetTopics]);

  const getContent = async(topicId: string) => {
    const result = await dispatch(GetContent(topicId)) as any
    dispatch(GetTopics());
    setState({...state, content: result})
  }

  const openAddTopic = (event: React.MouseEvent<HTMLElement>) => {
    setState({ ...state, [(event.currentTarget as any).name]: true })
  };

  const closeCreateTopicModal = () => {
    dispatch(GetTopics());
    setState({ ...state, addTopicModal: false, selectedTopic: null, addContentModal: false })
  }

  const editTopic = async (topicId: string) => {
    const topic = await dispatch(GetTopic(topicId)) as any
    if (topic) {
      setState({ ...state, selectedTopic: topic, addTopicModal: true })
      dispatch(GetTopics());
      getContent(contentSelector.topics[0]._id)
    }
  }

  const removeTopic = async (topicId: string) => {
    const topic = await dispatch(RemoveTopicAction(topicId)) as any
    if (topic) {
      getContent(contentSelector.topics[0]._id)
    }
  }

  return (
    <Card className="content-card">
      <Card className="topic-container">
        <div className="topics-section">
          {contentSelector.topics.map((topic, i) => {
            return <TopicItem topic={topic} key={i} removeTopic={removeTopic} editTopic={editTopic} />;
          })}
        </div>
        <div className="add-topic-icon" >
          <button className="transparent-btn" name="addTopicModal" onClick={openAddTopic}>
            <AddCircleOutlineIcon />
          </button>
        </div>
        <button className="add-topic" name="addTopicModal" onClick={openAddTopic}>Add Topic</button>

      </Card>
      <div className="add-content-section">
        <div className="add-content-icon">
          <button className="transparent-btn" name="addContentModal" onClick={openAddTopic}>
            <AddCircleOutlineIcon />
          </button>
        </div>
        <button className="add-content" name="addContentModal" onClick={openAddTopic}>Add Content</button>
      </div>

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
            {state.content.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.appointment}</TableCell>
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

      <Dialog open={state.addContentModal} onClose={closeCreateTopicModal}>
        <DialogContent>
          <AddContent content={state.selectedContent} onClose={closeCreateTopicModal} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Content;
