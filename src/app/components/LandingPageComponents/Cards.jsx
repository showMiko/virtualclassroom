import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined,BookFilled,FieldTimeOutlined, } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const Cards = ({title,description,avatar,isAdmin}) => (
  <Card
    style={{
      width: 300,
    }}
    actions={[
      <BookFilled key="session" />,
      <FieldTimeOutlined key="Time" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src={avatar}/>}
      title={title}
      description={description}
    />
  </Card>
);
export default Cards;