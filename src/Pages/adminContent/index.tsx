import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
  DialogTitle,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  getTopicAction,
  getTopicsAction,
  removeTopicAction,
} from "../../redux/actions/topic";
import TopicItem from "./topicItem";
import AddTopic from "./addTopic";
import { ContentItem, Topic } from "../../types/content";
import AddContent from "./addContent";
import {
  editContentAction,
  getContentAction,
  removeContentAction,
} from "../../redux/actions/content";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import "./index.css";
import { useModalState } from "../../components/hooks/modal";
import RemoveItem from "../../components/common/removeItem";
import PaginationTable from "../../components/common/pagination";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionResponse } from "../../models/response/types";
import { AddContentDialog } from "./AdminContent.styles";
interface State {
  content: Array<ContentItem>;
  addTopicModal: boolean;
  addContentModal: boolean;
  selectedTopic: Topic | null;
  selectedContent: ContentItem | null;
  actualTopic: Topic | null;
  total: number;
  topics: Array<Topic>;
}

const Content = () => {
  const dispatch = useAppDispatch();
  const { onOpen, onClose, isOpen } = useModalState();

  const [state, setState] = useState<State>({
    total: 0,
    content: [],
    addTopicModal: false,
    addContentModal: false,
    selectedTopic: null,
    selectedContent: null,
    actualTopic: null,
    topics: Array<Topic>(),
  });

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    perPage: 10,
  });

  // const classes = useStyles();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    debugger;
    const { payload } = (await dispatch(getTopicsAction())) as ActionResponse<
      Array<Topic>
    >;
    debugger;
    if (payload.data) {
      getContent(payload.data[0], payload.data);
    }
  };

  const getContent = async (topic: Topic | null, allTopics?: Array<Topic>) => {
    if (!topic) {
      return;
    }
    debugger;
    const { payload } = (await dispatch(getContentAction(topic._id))) as any;
    debugger;
    setState({
      ...state,
      content: payload.data,
      total: payload.count,
      actualTopic: topic,
      addTopicModal: false,
      selectedTopic: null,
      addContentModal: false,
      selectedContent: null,
      topics: allTopics || state.topics || [],
    });
  };

  const openAddTopic = async (event: React.MouseEvent<HTMLElement>) => {
    const nameEvent = (event.currentTarget as any).name;
    setState({ ...state, [nameEvent]: true });
  };

  const closeCreateTopicModal = () => {
    dispatch(getTopicsAction());
    getContent(state.actualTopic);
  };

  const editTopic = async (topicId: string) => {
    const topic = (await dispatch(getTopicAction(topicId))) as any;
    if (topic) {
      setState({ ...state, selectedTopic: topic, addTopicModal: true });
    }
  };

  const removeTopic = async (topicId: string) => {
    const topic = (await dispatch(removeTopicAction(topicId))) as any;
    if (topic) {
      getContent(state.topics[0]);
    }
  };

  const removeContent = async () => {
    if (state.selectedContent?._id) {
      const content = (await dispatch(
        removeContentAction(state.selectedContent._id)
      )) as any;
      if (content) {
        getContent(state.topics[0]);
        onClose();
      }
    }
  };

  const editContent = async (contentItem: ContentItem) => {
    setState({ ...state, selectedContent: contentItem, addContentModal: true });
    const content = (await dispatch(editContentAction(contentItem))) as any;
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
          {state.topics &&
            state.topics.map((topic) => {
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
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {item.appointment ? item.appointment.title : ""}
                  </TableCell>
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
        <PaginationTable total={state.total} title="Content" />
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

      <AddContentDialog
        fullWidth={true}
        fullScreen={true}
        open={state.addContentModal}
        onClose={closeCreateTopicModal}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeCreateTopicModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddContent
            topic={state.actualTopic}
            content={state.selectedContent}
            onClose={closeCreateTopicModal}
          />
        </DialogContent>
      </AddContentDialog>
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
