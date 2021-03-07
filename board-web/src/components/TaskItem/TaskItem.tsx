import { Dispatch } from 'redux';
import React from "react";
import { Button, List, Skeleton } from 'antd';

import { COMPLETE_TASK, ITask, TASK_STATUS } from "../../stores/task"
import { connect } from 'react-redux';
import { CheckOutlined } from '@ant-design/icons';

interface IProps {
  task: ITask,
  completeTask: (id: string) => void
}


class TaskItem extends React.Component<IProps> {
  state = {
    item: this.props.task 
  }

  handleCompleteTask = (id: string) => {
    this.props.completeTask(id);
  }

  render() {
    const {title, description, status, id} = this.props.task;
    const actions = [];
    if (status === TASK_STATUS.NEW) {
      actions.push(<Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={() => this.handleCompleteTask(id)}
      >complete</Button>)
    }
    return (<List.Item
            actions={actions}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                 false
                }
                title={title}
                description={description}
              />
              <div>{status}</div>
            </Skeleton>
          </List.Item>)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    completeTask: (payload: string) => dispatch({type: COMPLETE_TASK, payload})
  }
}

export default connect(null, mapDispatchToProps)(TaskItem)