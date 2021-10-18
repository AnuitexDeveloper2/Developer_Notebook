import { Box, Card } from '@material-ui/core';
import React, { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { httpMultipart, sendMultipart } from '../../helper/request';
import { CreateTopic } from '../../redux/actions/content';
import { Topic } from '../../types/content';

import "./index.css"

interface Props {
    addAndClose: () => void,
    topic: Topic | null
}

const AddTopic: FC<Props> = ({ addAndClose, topic }) => {

    const dispatch = useDispatch()

    const [state, setState] = useState({
        imagesArray: new Array<any>(),
        preview: '',
        title: '',
        description: '',
        image: ''
    })

    useEffect(()=> {
        if (topic) {
            setState({...state, title: topic.title, description: topic.description, image: topic.img as any})
        }
    },[topic])
    const setImage = (event: any) => {
        setState(
            {
                ...state,
                imagesArray: [...state.imagesArray, ...event.target.files],
                preview: URL.createObjectURL(event.target.files[0]),
            }
        )
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()

        const topic = {
            title: state.title,
            description: state.description
        }

        const newTopic: any = await dispatch(CreateTopic(topic))
        let formData = new FormData();
        if (state.imagesArray.length > 0) {
            formData.append("image", state.imagesArray[0])
            const result = await sendMultipart(formData, newTopic._id)
        }
        addAndClose()
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    return (
        <Box padding="10px">
            <div className="add-topic-title">
                <div>
                    New Topic
                </div>
            </div>
            <div>
                <div className="add-topic-name">
                    <div>
                        Title
                    </div>
                    <div>
                        <input defaultValue={state.title} name="title" onChange={handleChange} />
                    </div>
                </div>
                <div className={`add-topic-image ${state.preview ? "with-image" : "without-image"}`}>
                    <div>
                        Image
                    </div>
                    <input className="" type="file" name="imagesArray" onChange={setImage} />
                    {state.preview && <img className="topic-img-preview" src={state.preview} />}
                    {!state.preview && state.image && <img className="topic-img-preview" src={`https://topic-images1.s3.eu-central-1.amazonaws.com/${state.image}`} alt=""  />}
                </div>

                <div className="add-topic-image">
                    <div>
                        Description
                    </div>
                    <div>
                        <textarea defaultValue={state.description} className="add-topic-description" name="description" id="" cols={30} rows={10} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="add-topic-submit">
                    <button className="btn btn-danger" type="submit" onClick={onSubmit}>Submit</button>
                </div>
            </div>

        </Box>
    )
}

export default AddTopic