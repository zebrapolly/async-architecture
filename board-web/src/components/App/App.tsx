import React from 'react';
import { Layout } from 'antd';
import { Typography } from 'antd';
import TaskList from '../TaskList/TaskList';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout>
      <Header>
        <Title style={{color: 'white'}}>Борд для тасок попугов</Title>
      </Header>
      <Content>
        <TaskList></TaskList>
      </Content>
    </Layout>
  );
}

export default App;
