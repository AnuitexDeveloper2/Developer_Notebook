import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ModalProps } from "../../../components/hooks/modal";
import AddTopic from "./AddTopic";
import { Topic } from "../../../types/content";
interface Props {
  handleModal: ModalProps;
  topic: Topic | null;
  closeCreateTopicModal: (newTopic?: Topic) => void
}

const AddTopicDialog: React.FC<Props> = ({ handleModal, topic, closeCreateTopicModal }) => {
  return (
    <Dialog
      fullWidth
      open={handleModal.isOpen}
      onClose={handleModal.onClose}
      id="add-tickets-dialog"
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
        <AddTopic
          topic={topic}
          addAndClose={closeCreateTopicModal}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AddTopicDialog;
