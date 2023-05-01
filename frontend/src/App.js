import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Col, Layout, Row, Modal, Form, Input, Select, Switch, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TodoList, { typesOfLists } from './components/todoList';
import queries from './graphql/queries.js';
import mutations from './graphql/mutations.js';

import './app.css';

const { Header, Footer, Content } = Layout;
const { TextArea } = Input;

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState();
    const [submitting, setSubmitting] = useState(false);

    const [updatingLists, setupdatingLists] = useState(false);

    const [todoForm] = Form.useForm();

    const [loadTodo] = useLazyQuery(queries.GET_FULL_TODO_BY_ID);
    const [createTodo] = useMutation(mutations.CREATE_TODO);
    const [updateTodo] = useMutation(mutations.UPDATE_TODO);
    const [deleteTodo] = useMutation(mutations.DELETE_TODO);

    const handleOpenModal = async (todoId) => {
        setSelectedNoteId(todoId);

        const { data } = await loadTodo({ variables: { id: todoId } });

        todoForm.setFieldsValue(data.getTodos[0]);

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        todoForm.resetFields();
    };

    const handleOkModal = () => {
        todoForm.submit();
    };

    const handleFinishForm = async (values) => {
        setSubmitting(true);

        if (selectedNoteId === undefined) {
            await createTodo({ variables: values });
        } else {
            await updateTodo({ variables: { id: selectedNoteId, ...values } });
        }

        handleCloseModal();
        setSubmitting(false);
        updateLists();
    };

    const handleDeleteModal = async () => {
        await deleteTodo({ variables: { id: selectedNoteId } });

        handleCloseModal();
        updateLists();
    };

    const updateLists = () => {
        setupdatingLists(true);

        setTimeout(() => {
            setupdatingLists(false);
        }, 250);
    };

    const handleAddNew = () => {
        setSelectedNoteId();
        todoForm.resetFields();
        setIsModalOpen(true);
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#f5f5f5' }}>
                <h1>Todo list app</h1>
            </Header>
            <Content style={{ minHeight: 'calc(100vh - 64px - 86px)', padding: '15px' }}>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={handleAddNew}>
                            Add new todo
                        </Button>
                    </Col>
                </Row>

                {updatingLists ? (
                    <Row>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip={'Loading...'} />
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={[24, 24]}>
                        <Col span={8}>
                            <TodoList typeOfList={typesOfLists.all} showModal={handleOpenModal} />
                        </Col>
                        <Col span={8}>
                            <TodoList typeOfList={typesOfLists.highPriority} showModal={handleOpenModal} />
                        </Col>
                        <Col span={8}>
                            <TodoList typeOfList={typesOfLists.flagged} showModal={handleOpenModal} />
                        </Col>
                    </Row>
                )}

                <Modal
                    open={isModalOpen}
                    title={'Note'}
                    onOk={() => todoForm.submit()}
                    onCancel={handleCloseModal}
                    footer={[
                        <Button
                            key="delete"
                            type="primary"
                            danger
                            onClick={handleDeleteModal}
                            disabled={selectedNoteId === undefined}
                        >
                            Delete
                        </Button>,
                        <Button key="submit" type="primary" loading={submitting} onClick={handleOkModal}>
                            {selectedNoteId !== undefined ? 'Change' : 'Create'}
                        </Button>,
                    ]}
                >
                    <Form layout="vertical" form={todoForm} onFinish={handleFinishForm}>
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please insert a name' }]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="description" label="Description">
                                    <TextArea placeholder="Description" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="priority"
                                    label="Priority"
                                    rules={[{ required: true, message: 'Please select a priority' }]}
                                >
                                    <Select placeholder="Priority">
                                        <Select.Option value="HIGH">High</Select.Option>
                                        <Select.Option value="MEDIUM">Medium</Select.Option>
                                        <Select.Option value="LOW">Low</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="flagged" label="Flagged" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <p>Vasco Maia - April 2023</p>
                <p>ReactJS | GraphQL | Apollo | NodeJS | Typescript</p>
            </Footer>
        </Layout>
    );
}

export default App;
