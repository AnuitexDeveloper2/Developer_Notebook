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
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  GetTopics,
  GetTopic,
  RemoveTopicAction,
} from '../../redux/actions/topic';
import { AppState } from '../../redux/reducers/rootReducer';
import TopicItem from './topicItem';
import AddTopic from './addTopic';
import { ContentItem, Topic } from '../../types/content';
import AddContent from './addContent';
import {
  EditContent,
  GetContent,
  RemoveContent,
} from '../../redux/actions/content';

import './index.css';
import { useModalState } from '../../components/hooks/modal';
import RemoveItem from '../../components/common/removeItem';
import PaginationTable from '../../components/common/pagination';
import { GetAppointmentsByTopic } from '../../redux/actions/appointntment';
interface State {
  content: Array<ContentItem>;
  addTopicModal: boolean;
  addContentModal: boolean;
  selectedTopic: Topic | null;
  selectedContent: ContentItem | null;
  actualTopic: Topic | null;
  total: number
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  container: {
    height: 'auto',
    minHeight: '550px',
    ['@media (max-width:576px)']: {
      innerHeight: '100%',
      height: '100%',
    },
  },
  paperFullWidth: {
    width: '100%',
  },
  paperWidthSm: {
    maxWidth: 'unset',
  },
  paper: {
    margin: '0px',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    ['@media (max-width:576px)']: {
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
    },
  },
});

const Content = () => {
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useModalState();
  const contentSelector = useSelector((state: AppState) => state.content);

  const [state, setState] = useState<State>({
    total: 0,
    content: [],
    addTopicModal: false,
    addContentModal: false,
    selectedTopic: null,
    selectedContent: null,
    actualTopic: null,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    page :1,
    perPage: 10
  })

  const classes = useStyles();

  useEffect(() => {
    dispatch(GetTopics());
    if (contentSelector.topics.length > 0) {
      getContent(contentSelector.topics[0]);
    }
  }, [GetTopics]);

  const getContent = async (topic: Topic) => {
    const result = (await dispatch(GetContent(topic._id))) as any;
    dispatch(GetTopics());
    
    setState({
      ...state,
      content: result.data,
      total: result.count,
      actualTopic: topic,
      addTopicModal: false,
      selectedTopic: null,
      addContentModal: false,
      selectedContent: null,
    });
  };

  const openAddTopic = async(event: React.MouseEvent<HTMLElement>) => {
    const nameEvent = (event.currentTarget as any).name
    setState({ ...state, [nameEvent]: true });
  };

  const closeCreateTopicModal = () => {
    dispatch(GetTopics());
    getContent(state.actualTopic);
  };

  const editTopic = async (topicId: string) => {
    const topic = (await dispatch(GetTopic(topicId))) as any;
    if (topic) {
      setState({ ...state, selectedTopic: topic, addTopicModal: true });
    }
  };

  const removeTopic = async (topicId: string) => {
    const topic = (await dispatch(RemoveTopicAction(topicId))) as any;
    if (topic) {
      getContent(contentSelector.topics[0]);
    }
  };

  const removeContent = async () => {
    const content = (await dispatch(
      RemoveContent(state.selectedContent._id),
    )) as any;
    if (content) {
      getContent(contentSelector.topics[0]);
      onClose();
    }
  };

  const editContent = async (contentItem: ContentItem) => {
    setState({ ...state, selectedContent: contentItem, addContentModal: true });
    const content = (await dispatch(EditContent(contentItem))) as any;
  };

  const selectTopic = (topic: Topic) => {
    setState({ ...state, actualTopic: topic });
    getContent(topic);
  };

  const openRemove = (contentItem: ContentItem) => {
    setState({ ...state, selectedContent: contentItem });
    onOpen();
  };

  return (
    <Card className="content-card">
      <Card className="topic-container-admin">
        <div className="topics-section">
          {contentSelector.topics.map((topic) => {
            return (
              <TopicItem
                actualTopic={state.actualTopic}
                topic={topic}
                key={topic._id}
                removeTopic={removeTopic}
                editTopic={editTopic}
                selectTopic={selectTopic}
              />
            );
          })}
        </div>
        <div className="add-topic-icon">
          <button
            className="transparent-btn"
            name="addTopicModal"
            onClick={openAddTopic}
          >
            <AddCircleOutlineIcon />
          </button>
        </div>
        <button
          className="add-topic"
          name="addTopicModal"
          onClick={openAddTopic}
        >
          Add Topic
        </button>
      </Card>
      <div className="add-content-section">
        <div className="add-content-icon">
          <button
            className="transparent-btn"
            name="addContentModal"
            onClick={openAddTopic}
          >
            <AddCircleOutlineIcon />
          </button>
        </div>
        <button
          className="add-content"
          name="addContentModal"
          onClick={openAddTopic}
        >
          Add Content
        </button>
      </div>

      <TableContainer className="table-container">
        <Table>
          <TableHead id="table-head">
            <TableRow>
              <TableCell id="table-head-content">Title</TableCell>
              <TableCell id="table-head-content">Description</TableCell>
              <TableCell id="table-head-content">Appointment</TableCell>
              <TableCell id="table-head-content">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="rt-table">
            {state.content.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="admin-content-description">{item.description}</TableCell>
                  <TableCell>{item.appointment ? item.appointment.title: ''}</TableCell>
                  <TableCell>
                    <div className="content-actions">
                      <div>
                        <EditIcon
                          className="edit-image-icon"
                          onClick={() => editContent(item)}
                        />
                      </div>
                      <div>
                        <HighlightOffIcon
                          className="remove-image-icon"
                          onClick={() => openRemove(item)}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <PaginationTable
          total={state.total}
          title="Content"
        />
      </TableContainer>
      <Dialog
        fullWidth
        open={state.addTopicModal}
        onClose={closeCreateTopicModal}
        id="add-tickets-dialog"
      >
        <DialogContent>
          <AddTopic
            topic={state.selectedTopic}
            addAndClose={closeCreateTopicModal}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth={true}
        fullScreen={true}
        open={state.addContentModal}
        onClose={closeCreateTopicModal}
        classes={{
          root: classes.root,
          container: classes.container,
          paper: classes.paper,
        }}
      >
        <DialogContent>
          <AddContent
            topic={state.actualTopic}
            content={state.selectedContent}
            onClose={closeCreateTopicModal}
          />
        </DialogContent>
      </Dialog>
      <Dialog fullWidth open={isOpen} onClose={onClose}>
        <DialogContent>
          <RemoveItem
            closeModal={onClose}
            removeUser={removeContent}
            minorText=""
            mainText="Content"
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Content;
