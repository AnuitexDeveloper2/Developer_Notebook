import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { CreateContent } from '../../redux/actions/content';

interface Props {
    content: any;
    onClose: () => void
}
const AddContent: FC<Props> = ({ content, onClose }) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        title: "",
        description: '',
        appointment: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const onSubmit = async () => {
        if (!content) {
            const createdTopic: any = await dispatch(CreateContent(state))
            if (createdTopic) {
                onClose()
            }
        } else {
            // const result: any = await dispatch(EditTopic(editedTopic, state.id))
        }
        
    }

    return (
        <Box padding="10px">
            <div className="add-topic-title">
                <div>
                    {content ? "Edit" : "New"} Content
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

                <div className="add-topic-submit">
                    <button className="btn btn-danger" type="submit" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </Box>
    )
}

export default AddContent