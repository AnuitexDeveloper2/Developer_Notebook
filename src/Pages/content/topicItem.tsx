import React, { FC, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { Topic } from '../../types/content';
import { Dialog, DialogContent } from '@material-ui/core';
import RemoveItem from '../../components/common/removeItem';
import { useModalState } from '../../components/hooks/modal';

interface Props {
    topic: Topic;
    actualTopic: Topic
    editTopic: (id: string) => Promise<void>
    removeTopic: (id: string) => Promise<void>
    selectTopic: (topic: Topic) => void
}

const TopicItem: FC<Props> = ({ topic, editTopic, removeTopic, actualTopic, selectTopic }) => {

    const { onOpen, onClose, isOpen } = useModalState()

    let highlight = ''
    if (topic && actualTopic) {
        highlight = actualTopic._id === topic._id ? 'selected-topic' : ''
    }

    const handleSelect = () => {
        selectTopic(topic)
    }

    return (
        <div className={`admin-topic-wrapper ${highlight}`} >
            <div className="admin-topic-section" onClick={handleSelect}>
                <div className="admin-topic-title">
                    {topic.title}
                </div>
                <div >
                    {topic.img && <img className="admin-topic-img" src={`https://topic-images1.s3.eu-central-1.amazonaws.com/${topic.img}`} alt={topic.title} />}
                </div>
            </div>
            <div>
                <div>
                    <EditIcon className="edit-image-icon" onClick={() => editTopic(topic._id)} />
                </div>
                <div>

                    <HighlightOffIcon className="remove-image-icon" onClick={onOpen} />
                </div>
            </div>
            <Dialog
                fullWidth
                open={isOpen}
                onClose={onClose}
            >
                <DialogContent>
                    <RemoveItem
                        closeModal={onClose}
                        removeUser={() => removeTopic(topic._id)}
                        minorText="You can delete a topic only if it does not contain content"
                        mainText="Topic"
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TopicItem