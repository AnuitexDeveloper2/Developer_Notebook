import { useState } from "react";
import { useEffect } from "react";
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
import { ContentItem, Topic } from "../../types/content";
import {
  getContentAction,
  removeContentAction,
} from "../../redux/actions/content";

import "./index.css";
import { useModalState } from "../../components/hooks/modal";
import RemoveItem from "../../components/common/removeItem";
import PaginationTable from "../../components/common/pagination";
import { useAppDispatch } from "../../redux/store";
import { ActionResponse } from "../../models/response/types";
import AddContentModal from "./addContentDiaalog/AddContentDialog";
import AddTopicDialog from "./addTopicDialog/AddTopicDialog";
import { addImagesToTopicItem } from "../../helper/firebase";
interface State {
  content: Array<ContentItem>;
  selectedTopic: Topic | null;
  selectedContent: ContentItem | null;
  actualTopic: Topic | null;
  total: number;
  topics: Array<Topic>;
}

const Content = () => {
  const dispatch = useAppDispatch();
  const handleRemoveModal = useModalState();
  const handleContentModal = useModalState();
  const handleTopicModal = useModalState();

  const [state, setState] = useState<State>({
    total: 0,
    content: [],
    selectedTopic: null,
    selectedContent: null,
    actualTopic: null,
    topics: Array<Topic>(),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { payload } = (await dispatch(getTopicsAction())) as ActionResponse<
      Array<Topic>
    >;
    if (payload.data) {
      const topics = await addImagesToTopicItem(payload.data);
      getContent(topics[0], topics);
    }
  };

  const getContent = async (topic: Topic | null, allTopics?: Array<Topic>) => {
    if (!topic) {
      return;
    }
    const { payload } = (await dispatch(getContentAction(topic._id))) as any;
    setState({
      ...state,
      content: payload.data,
      total: payload.count,
      actualTopic: topic,
      selectedTopic: null,
      selectedContent: null,
      topics: allTopics || state.topics || [],
    });
    handleTopicModal.onClose();
  };

  const closeCreateTopicModal = (newTopic?: Topic) => {
    const topics = [...state.topics];
    if (newTopic) {
      topics.push(newTopic);
    }
    handleTopicModal.onClose();
    setState({ ...state, topics: topics });
  };

  const editTopic = async (topicId: string) => {
    const topic = state.topics.find((t) => t._id === topicId);
    if (topic) {
      setState({ ...state, selectedTopic: topic });
      handleTopicModal.onOpen();
    }
  };

  const removeTopic = async (topicId: string) => {
    const { payload } = (await dispatch(
      removeTopicAction(topicId)
    )) as ActionResponse<boolean>;
    debugger;
    if (payload.data) {
      await getData();
    }
  };

  const removeContent = async () => {
    if (state.selectedContent?._id) {
      const content = (await dispatch(
        removeContentAction(state.selectedContent._id)
      )) as any;
      if (content) {
        getContent(state.topics[0]);
        handleRemoveModal.onClose();
      }
    }
  };

  const editContent = async (contentItem: ContentItem) => {
    setState({ ...state, selectedContent: contentItem });
    handleContentModal.onOpen();
  };

  const selectTopic = (topic: Topic) => {
    setState({ ...state, actualTopic: topic });
    getContent(topic);
  };

  const openRemove = (contentItem: ContentItem) => {
    setState({ ...state, selectedContent: contentItem });
    handleRemoveModal.onOpen();
  };

  const closeContentModal = () => {
    getContent(state.actualTopic);
    handleContentModal.onClose();
  };

  const createNewTopic = () => {
    setState({ ...state, selectedTopic: null });
    handleTopicModal.onOpen();
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
            onClick={createNewTopic}
          >
            <AddCircleOutlineIcon />
          </button>
        </div>
        <button
          className="add-topic"
          name="addTopicModal"
          onClick={createNewTopic}
        >
          Add Topic
        </button>
      </Card>
      <div className="add-content-section">
        <div className="add-content-icon">
          <button
            className="transparent-btn"
            name="addContentModal"
            onClick={handleContentModal.onOpen}
          >
            <AddCircleOutlineIcon />
          </button>
        </div>
        <button
          className="add-content"
          name="addContentModal"
          onClick={handleContentModal.onOpen}
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

      <AddTopicDialog
        handleModal={handleTopicModal}
        topic={state.selectedTopic}
        closeCreateTopicModal={closeCreateTopicModal}
      />

      <AddContentModal
        handleModal={handleContentModal}
        closeContentModal={closeContentModal}
        topic={state.actualTopic}
        content={state.selectedContent}
      />
      <Dialog
        fullWidth
        open={handleRemoveModal.isOpen}
        onClose={handleRemoveModal.onClose}
      >
        <DialogContent>
          <RemoveItem
            closeModal={handleRemoveModal.onClose}
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
