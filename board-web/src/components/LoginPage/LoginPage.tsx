import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { ILoginAction, LOGIN_REQUEST } from '../../stores/auth';
import { connect } from 'react-redux';
import { ICreateTaskAction } from '../../stores/task';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IProps {
  login: (args: any) => void;
}

class LoginPage extends React.Component<IProps> {
  componentDidMount(){
    console.log('MOUNT');
    
  }
  onFinish = (values: any) => {
    this.props.login(values)
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (payload: ILoginAction) => dispatch({type: LOGIN_REQUEST, payload })
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);