import React, { FC } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { Topic } from '../../types/content';

interface Props {
    topic: Topic;
    editTopic: (id: string) => Promise<void>
    removeTopic:(id:string) => Promise<void>
}

const TopicItem: FC<Props> = ({ topic, editTopic, removeTopic }) => {
    return (
        <div className="admin-topic-wrapper">
            <div className="admin-topic-section">
                <div className="admin-topic-title">
                    {topic.title}
                </div>
                <div >
                    {topic.img && <img className="admin-topic-img" src={`https://topic-images1.s3.eu-central-1.amazonaws.com/${topic.img}`} alt="" />}
                </div>
            </div>
            <div>
                <div>
                    <EditIcon className="edit-image-icon" onClick={()=>editTopic(topic._id)}/>
                </div>
                <div>

                    <HighlightOffIcon className="remove-image-icon" onClick={()=>removeTopic(topic._id)}/>
                </div>
            </div>
        </div>
    )
}

export default TopicItem