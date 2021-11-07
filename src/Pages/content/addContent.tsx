import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { CreateContent, EditContent } from '../../redux/actions/content';
import { ContentItem, Topic } from '../../types/content';
import { AppState } from '../../redux/reducers/rootReducer';

interface Props {
    content: ContentItem | null;
    onClose: () => void;
    topic: Topic
}

interface ContentState {
    content: ContentItem | null,
    selectedTopic: Topic | null
}

const AddContent: FC<Props> = ({ content, onClose, topic }) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        title: "",
        description: '',
        appointment: ''
    })

    const topics = useSelector((state: AppState) => state.content.topics);

    const [editedContent, setContent] = useState<ContentState>({ content: null, selectedTopic: null })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        
        if (content) {
            setContent({ ...editedContent, content: content, selectedTopic: topic })
            setState(content)
        } else {
            setContent({ ...editedContent, selectedTopic: topic })
        }
    }, [content])

    const handleSelect = (topic: Topic) => {
        setContent({ ...editedContent, selectedTopic: topic })
    }

    const onSubmit = async () => {
        const newContent = {...state, topic: topic._id}
        if (!content) {
            const createdContent: any = await dispatch(CreateContent(newContent))
            if (createdContent) {
                onClose()
            }
        } else {
            const result: any = await dispatch(EditContent(newContent, editedContent.content._id))
            if (result) {
                onClose()
            }
        }

    }

    return (
        <Box padding="10px">

            <div className="add-topic-title">
                <div>
                    {content ? "Edit" : "New"} Content
                </div>
            </div>
                <Box display={{ sm: "block", md: "flex" }} justifyContent="flex-start">
                    <div>
                    <div className="add-topic-name">
                        <div>
                            Title
                        </div>
                        <div>
                            <input defaultValue={state.title} name="title" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="add-topic-name">
                        <div>
                            Appointment
                        </div>
                        <div>
                            <input defaultValue={state.appointment} name="appointment" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="add-topic-image">
                        <div>
                            Description
                        </div>
                        <div>
                            <textarea defaultValue={state.description} className="add-topic-description" name="description" id="" cols={30} rows={10} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    </div>
                    <div className="content-topic-select">
                        <form id="app-cover">
                            <div id="select-box">
                                <input type="checkbox" id="options-view-button" />
                                <div id="select-button" className="brd">
                                    <div id="selected-value">
                                        {editedContent.selectedTopic &&<span>{editedContent.selectedTopic.title}</span>}
                                    </div>
                                    <div id="chevrons">
                                        <i className="fas fa-chevron-up"></i>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div id="options">
                                    {topics.map((item) => {
                                        return (
                                            <div key={item._id} className="option" onClick={() => handleSelect(item)}>
                                                <input className="s-c top" type="radio" name="platform" value="codepen" />
                                                <input className="s-c bottom" type="radio" name="platform" value="codepen" />
                                                <span className="label">{item.title}</span>
                                                <span className="opt-val">{item.title}</span>
                                            </div>
                                        )
                                    })}
                                    <div id="option-bg"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>

                <div className="add-topic-submit">
                    <button className="btn btn-danger" type="submit" onClick={onSubmit}>Submit</button>
                </div>
        </Box>
    )
}

export default AddContent