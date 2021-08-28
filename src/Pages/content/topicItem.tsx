import React, { FC } from 'react';
import { Topic } from '../../types/content';

interface Props {
    topic: Topic
}

const TopicItem: FC<Props> = ({ topic }) => {
    return (
        <div className="admin-topic-section">
            <div className="admin-topic-title">
                {topic.title}
            </div>
            <div >
                {topic.img && <img className="admin-topic-img" src={`https://topicimages.s3.eu-west-1.amazonaws.com/${topic.img}`} alt="" />}
            </div>
        </div>
    )
}

export default TopicItem