import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Toolbar, Card, TableContainer, Table, TableHead, TableRow, TableCell, Typography, Box, TableBody } from '@material-ui/core';
import "./index.css"
import { GetTopics } from '../../redux/actions/content';

interface State {
    content: Array<any>
}

const Content = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        content: [{ title: "react", description: "test" }]
    })

    useEffect(() => {
      const result =  dispatch(GetTopics())
    }, [])
    return (
        <Card className="content-card">

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

export default connect(null)(Content)