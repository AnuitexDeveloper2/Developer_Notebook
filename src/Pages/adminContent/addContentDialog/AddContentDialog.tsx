import React from "react";
import { DialogTitle, IconButton, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalProps } from "../../../components/hooks/modal";
import { AddContentDialog } from "./AddContentDialog.styles";
import { ContentItem, Record, Topic } from "../../../types/content";
import AddContent from "./AddContent";
interface Props {
  handleModal: ModalProps;
  closeContentModal: () => void;
  topic: Topic | null;
  content: ContentItem<Record> | null;
}

export const AddContentModal: React.FC<Props> = ({
  handleModal,
  closeContentModal,
  topic,
  content,
}) => {
  return (
    <AddContentDialog
      fullWidth={true}
      fullScreen={true}
      open={handleModal.isOpen}
      onClose={handleModal.onClose}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModal.onClose}
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
          topic={topic}
          content={content}
          onClose={closeContentModal}
        />
      </DialogContent>
    </AddContentDialog>
  );
};

export default AddContentModal;
