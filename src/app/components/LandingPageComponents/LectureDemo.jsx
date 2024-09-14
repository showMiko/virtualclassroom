import { Avatar, Button, Card, Divider, Tooltip, Typography } from "antd";
import React from "react";
import {
  UserOutlined,
  AntDesignOutlined,
  BookFilled,
  PlayCircleOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

import CollapseMenu from "./CollapseMenu";
const LectureDemo = () => {
  const genExtra = () => (
    <BookFilled
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );
  const itemsBooks = [
    {
      key: "1",
      label: "Basics Of Computer Programming",
      children: <div>Learn the Basic of Computer Programming</div>,
      extra: genExtra(),
    },
    {
      key: "2",
      label: "Basics Of Java",
      children: (
        <div>Master the Concepts of JAVA from fundaments to SpringBoot</div>
      ),
      extra: genExtra(),
    },
    {
      key: "3",
      label: "Data Science with Python",
      children: <div>Learn Everything you need with Python</div>,
      extra: genExtra(),
    },
  ];

  const itemsSessions = [
    {
      key: "1",
      label: "Basics Of Computer Programming",
      children: (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">Session 1 <Button><ArrowRightOutlined/></Button></div>
          <div className="flex flex-row justify-between">Session 2 <Button><ArrowRightOutlined/></Button></div>
        </div>
      ),
      extra: genExtra(),
    },
    {
      key: "2",
      label: "Basics Of Java",
      children: (
        <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">Session 1 <Button><ArrowRightOutlined/></Button></div>
        <div className="flex flex-row justify-between">Session 2 <Button><ArrowRightOutlined/></Button></div>
        <div className="flex flex-row justify-between">Session 3 <Button><ArrowRightOutlined/></Button></div>
      </div>
      ),
      extra: genExtra(),
    },
    {
      key: "3",
      label: "Data Science with Python",
      children: (
        <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">Session 1 <Button><ArrowRightOutlined/></Button></div>
        <div className="flex flex-row justify-between">Session 2 <Button><ArrowRightOutlined/></Button></div>
        <div className="flex flex-row justify-between">Session 3 <Button><ArrowRightOutlined/></Button></div>
      </div>
      ),
      extra: genExtra(),
    },
  ];
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <Typography style={{ fontSize: "20px" }}>Computer (Books)</Typography>
        <CollapseMenu items={itemsBooks} />
        <Divider />
        <Typography style={{ fontSize: "20px" }}>
          Computer (Sessions)
        </Typography>
        <CollapseMenu items={itemsSessions} />
        <Avatar.Group>
          <Tooltip title="User 1" placement="top">
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          </Tooltip>
          <Tooltip title="User 2" placement="top">
            <Avatar
              style={{
                backgroundColor: "#f56a00",
              }}
            >
              S
            </Avatar>
          </Tooltip>

          <Tooltip title="User 3" placement="top">
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              //   icon={<UserOutlined />}
            >
              A
            </Avatar>
          </Tooltip>
          <Tooltip title="User 4" placement="top">
            <Avatar
              style={{
                backgroundColor: "#1677ff",
              }}
              icon={<AntDesignOutlined />}
            />
          </Tooltip>
        </Avatar.Group>
      </div>
    </Card>
  );
};

export default LectureDemo;
