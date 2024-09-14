import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BookFilled
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const LecturesComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
        style={{height:"100%"}}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <BookFilled />,
              label: 'Lecture 1',
            },
            {
              key: '2',
              icon: <BookFilled />,
              label: 'Lecture 2',
            },
            {
              key: '3',
              icon: <BookFilled />,
              label: 'Lecture 3',
            },
            {
                key: '4',
                icon: <BookFilled />,
                label: 'Lecture 4',
              },
              {
                key: '5',
                icon: <BookFilled />,
                label: 'Lecture 5',
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,   
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className='mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center'>Welcome Students</div>
          <div>Welcome to the First  Lesson of Computer Fundamentals. Programming with Java.</div>
          <div className='mb-4 text-xl font-bold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white '>Lets Get Started</div>
          <div>Java is a general-purpose programming language that is widely used to create applications for various platforms.</div>
<div>It was developed by Sun Microsystems in the early 1990s and is now owned by Oracle.</div>
<div>Java is known for its platform independence, meaning that programs written in Java can run on any system with a Java Virtual Machine (JVM) installed.</div>
<div>It is an object-oriented language, which means that it uses objects to represent data and behavior.</div>
<div>Java is used in a wide range of applications, including web development, mobile app development, desktop applications, and enterprise software.</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LecturesComponent;

