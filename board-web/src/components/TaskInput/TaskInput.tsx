import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Dispatch } from 'redux';
import { CREATE_TASK, ICreateTaskAction, ITask } from '../../stores/task';
import { connect } from 'react-redux';

interface ICreateTaskInput {
  title: string;
  description: string;
  createdAt: Date;
  assigneeId: string;
  assignerId: string;
}

interface ITaskInputState {
  visible: boolean,
  isLoading: boolean,
  task?: ICreateTaskInput,
}
interface IProps {
  createTask: (payload: any) => void
}

class TaskInput extends React.Component<IProps, ITaskInputState> {
  state = {
    task: {
      title: '',
      description: '',
      createdAt: new Date,
      assigneeId: '',
      assignerId: ''
    },
    visible: false,
    isLoading: false
  };

  handleFieldChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        [key]: event.target.value
      }
    })
  }

  handleCreateTask = () => {
    this.onClose();
    this.props.createTask(this.state.task);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer} style={{margin: 20}}>
          <PlusOutlined /> New Task
        </Button>
        <Drawer
          title="Create a new task"
          width={300}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.handleCreateTask} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter title' }]}
                >
                  <Input 
                    onChange={this.handleFieldChange('title')}
                    placeholder="Please enter title" 
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter description',
                    },
                  ]}
                >
                  <Input 
                  placeholder="please enter description" 
                  onChange={this.handleFieldChange('description')}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createTask: (payload: ICreateTaskAction) => dispatch({type: CREATE_TASK, payload })
  }
}

export default connect(null, mapDispatchToProps)(TaskInput)