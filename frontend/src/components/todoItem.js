import React from 'react';
import { List, Row, Col } from 'antd';
import { StarFilled, UpOutlined } from '@ant-design/icons';

const TodoItem = (props) => {
    const handleClick = () => {
        props.showModal(props.todo.id);
    };

    const priorityColours = {
        HIGH: 'red',
        MEDIUM: 'orange',
        LOW: 'green',
    };

    return (
        <React.Fragment>
            <List.Item className="todoItem" onClick={handleClick}>
                <Row justify={'space-between'} style={{ width: '100%' }}>
                    <Col>
                        <h1>{props.todo.name}</h1>
                    </Col>
                    <Col>
                        <Row>
                            <Col>{props.todo.flagged ? <StarFilled style={{ color: 'orange' }} /> : <></>}</Col>
                            <Col style={{ color: priorityColours[props.todo.priority] }}>
                                <UpOutlined />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </List.Item>
        </React.Fragment>
    );
};

export default TodoItem;
