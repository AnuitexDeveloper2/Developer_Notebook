import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Toolbar, Card, TableContainer, Table, TableHead, TableRow, TableCell, Typography, Box, TableBody } from '@material-ui/core';
import "./index.css"
import { GetTopics } from '../../redux/actions/content';
import { AppState } from '../../redux/reducers/rootReducer';
import TopicItem from './topicItem';

interface State {
    content: Array<any>
}

const Content = () => {
    const dispatch = useDispatch();
    const contentSelector = useSelector((state:AppState)=> state.content)
    const [state, setState] = useState<State>({
        content: [{ title: "react", description: "test" }]
    })
    useEffect(() => {
      dispatch(GetTopics())
    }, [])
    return (
        <Card className="content-card">
            <Card>
                {contentSelector.topics.map((topic)=> {
                    return (
                        <TopicItem topic={topic}/>
                    )
                })}
            </Card>
            <TableContainer className="table-container">
                <Table>
                    <TableHead>
                        <TableCell>
                            Title
                        </TableCell>
                        <TableCell>
                            Description
                        </TableCell>
                    </TableHead>
                    {state.content.map((item) => {
                        return (
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {item.title}
                                    </TableCell>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
            </TableContainer>
        </Card>
    )
}


export default Content