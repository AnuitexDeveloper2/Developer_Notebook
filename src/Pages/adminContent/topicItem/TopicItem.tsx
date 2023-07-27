import React, { FC, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { Topic } from "../../../types/content";
import { Dialog, DialogContent } from "@mui/material";
import RemoveItem from "../../../components/common/removeItem";
import { useModalState } from "../../../components/hooks/modal";
import {
  AdminTopicImage,
  AdminTopicSection,
  AdminTopicTitle,
  AdminTopicWrapper,
} from "./TopicItem.styles";
import { EditActionImage, RemoveActionImage } from "../../../styles/common.styles";

interface Props {
  topic: Topic;
  actualTopic: Topic | null;
  editTopic: (id: string) => Promise<void>;
  removeTopic: (id: string) => Promise<void>;
  selectTopic: (topic: Topic) => void;
}

const TopicItem: FC<Props> = ({
  topic,
  editTopic,
  removeTopic,
  actualTopic,
  selectTopic,
}) => {
  const { onOpen, onClose, isOpen } = useModalState();

  let highlight = "";
  if (topic && actualTopic) {
    highlight = actualTopic._id === topic._id ? "selected-topic" : "";
  }

  const handleSelect = () => {
    selectTopic(topic);
  };

  const deleteTopic = () => {
    onClose();
    removeTopic(topic._id);
  };

  return (
    <AdminTopicWrapper className={`${highlight}`}>
      <AdminTopicSection onClick={handleSelect}>
        <AdminTopicTitle>{topic.title}</AdminTopicTitle>
        <div>
          {topic.img && (
            <AdminTopicImage
              src={topic.imgSrc}
              alt={topic.title}
            />
          )}
        </div>
      </AdminTopicSection>
      <div>
        <div>
          <EditActionImage
            onClick={() => {
              editTopic(topic._id);
            }}
          />
        </div>
        <div>
          <RemoveActionImage onClick={onOpen} />
        </div>
      </div>
      <Dialog fullWidth open={isOpen} onClose={onClose}>
        <DialogContent>
          <RemoveItem
            closeModal={onClose}
            removeUser={deleteTopic}
            minorText="You can delete a topic only if it does not contain content"
            mainText="Topic"
          />
        </DialogContent>
      </Dialog>
    </AdminTopicWrapper>
  );
};

export default TopicItem;
