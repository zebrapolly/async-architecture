import React from 'react';
import { Layout, Typography } from 'antd';
import { Route, Router } from 'react-router-dom';

import TaskList from '../TaskList/TaskList';
import { PrivateRoute } from '../PrivateRoute';
import LoginPage from '../LoginPage/LoginPage';
import { history } from '../../helpers';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
class App extends React.Component {

  render() {
    return (
      <Layout>
      {/* // <Header>
      //   <Title style={{color: 'white'}}>Борд для тасок попугов</Title>
      // </Header> */}
      <Router history={history}>
        <Content>     
          <PrivateRoute path="/" component={TaskList} />
          <Route exact path="/login" component={LoginPage} />
        </Content>             
        </Router>
        { /* <TaskList></TaskList> */}
      {/* <LoginPage/> */}

    </Layout>
    )
  }
}

export default App;
