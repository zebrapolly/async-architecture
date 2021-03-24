import { List } from 'antd';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import TaskItem from '../TaskItem/TaskItem';
import TaskInput from '../TaskInput/TaskInput';
import { GET_TASKS, ITask } from '../../stores/task';
import { Dispatch } from 'redux';


const count = 3;

interface ITaskListState {
  isLoading: boolean;
  list: ITask[],
}
interface IProps {
  list: ITask[],
  isLoading: boolean,
  getTasks: () => void
}

class TaskList extends React.Component<IProps ,ITaskListState> {
  state:ITaskListState = {
    isLoading: false,
    list: [],
  };

  componentDidMount() {
    this.props.getTasks();
  }

  getData = async  (callback: Function) => {
    const res = await axios.get('/task');
    callback(res.data);
  };

  render() {
    const { isLoading, list } = this.props;
    return (
      <React.Fragment>
        <TaskInput/>
        <List
        style={{padding:50}}
        loading={false}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <TaskItem task={item}></TaskItem>
        )}
      />
      </React.Fragment>
      
    );
  }
}

function mapStateToProps(state: any) {
  const { tasks } = state
  return { list: tasks.list, isLoading: tasks.isLoading }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getTasks: () => dispatch({type: GET_TASKS})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)