import React from 'react';
import { useQuery } from '@apollo/client';
import { Row, Col, Spin, Empty, Divider, Result, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TodoItem from './todoItem.js';
import queries from '../graphql/queries';

export const typesOfLists = {
    all: { title: 'All', fn: 'GET_ALL_TODOS', variables: {} },
    flagged: { title: 'Flagged', fn: 'GET_TODOS_BY_FLAGGED', variables: { flagged: true } },
    notFlagged: { title: 'Not flagged', fn: 'GET_TODOS_BY_FLAGGED', variables: { flagged: false } },
    highPriority: { title: 'High priority', fn: 'GET_TODOS_BY_PRIORITY', variables: { priority: 'HIGH' } },
    mediumPriority: { title: 'Medium priority', fn: 'GET_TODOS_BY_PRIORITY', variables: { priority: 'MEDIUM' } },
    lowPriority: { title: 'Low priority', fn: 'GET_TODOS_BY_PRIORITY', variables: { priority: 'LOW' } },
};

const TodoList = (props) => {
    const query = queries[props.typeOfList.fn];
    const { loading, error, data } = useQuery(query, { variables: props.typeOfList.variables });

    return (
        <React.Fragment>
            <Row style={{ textAlign: 'center' }}>
                <Col span={24}>
                    <h1>{props.typeOfList.title}</h1>
                    <Divider />
                </Col>
            </Row>
            <Row justify={'center'}>
                {loading ? (
                    <Row justify={'center'}>
                        <Col>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip={'Loading...'} />
                        </Col>
                    </Row>
                ) : error ? (
                    <Row justify={'center'}>
                        <Col>
                            <Result
                                status={'error'}
                                title={'Error fetching data'}
                                subTitle={'Something went wrong when executing the query'}
                            />
                        </Col>
                    </Row>
                ) : data.getTodos.length === 0 ? (
                    <Row justify={'center'}>
                        <Col>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Col>
                    </Row>
                ) : (
                    <Col span={24}>
                        <List
                            bordered
                            dataSource={data.getTodos}
                            renderItem={(todo) => <TodoItem todo={todo} showModal={props.showModal} />}
                        />
                    </Col>
                )}
            </Row>
        </React.Fragment>
    );
};

export default TodoList;
