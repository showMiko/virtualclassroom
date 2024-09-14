"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {
  Spin,
  Empty,
  Button,
  Modal,
  Input,
  Form,
  message,
  Tabs,
  Card,
  Avatar,
} from "antd";
import { PlusCircleOutlined , BookFilled} from "@ant-design/icons";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import ClassCards from "@/app/components/ClassCards";
import Meta from "antd/es/card/Meta";

const Classes = ({ params }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [isAddingClass, setIsAddingClass] = useState(false);

  const router = useRouter();
  const { user, userData } = useContext(AuthContext);
  const uid = params.uid;

  const fetchAllClasses = async () => {
    try {
      const response = await fetch(`/api/all-classes`);
      const data = await response.json();
      setAllClasses(data.classes);
      const temp = data.classes.filter((classItem) => classItem.uid === uid);
      console.log(data);
      setMyClasses(temp);
    } catch (error) {
      console.error("Error fetching all classes:", error);
    }
  };

  const fetchMyClasses = async () => {
    try {
      const response = await fetch(`/api/classes?uid=${uid}`);
      const data = await response.json();
      setMyClasses(data.classes);
    } catch (error) {
      console.error("Error fetching my classes:", error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
    // fetchMyClasses();
    setIsLoading(false);
  }, [uid]);

  const handleAddClass = async () => {
    setIsAddingClass(true);
    if (!className || !classDescription) {
      console.error("Please enter class name and description");
      setIsAddingClass(false);
      return;
    }

    try {
      await axios.post("/api/classes", {
        className,
        classDescription,
        uid,
        user,
      });
      message.success("Class Added");
      setClassName("");
      setClassDescription("");
      setIsModalVisible(false);
      setIsAddingClass(false);
      fetchAllClasses();
    } catch (error) {
      message.error("Error Adding Class");
      console.error("Error adding class:", error);
      setIsAddingClass(false);
    }
  };

  return (
    <div className="p-5">
      {userData && userData.isAdmin && (
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
          loading={isAddingClass}
        >
          Add New Class
        </Button>
      )}

      <Modal
        title="Add Class"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddClass}
      >
        <Form layout="vertical">
          <Form.Item label="Class Name">
            <Input
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={classDescription}
              onChange={(e) => setClassDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="All Classes" key="1">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin />
            </div>
          ) : (
            <div className="flex mt-5 items-center h-full gap-2 flex-wrap">
              {allClasses.length > 0 ? (
                allClasses.map((classItem, index) => (
                  <ClassCards
                    key={index}
                    avatar={classItem.profilePic}
                    title={classItem.name}
                    description={classItem.description}
                    isAdmin={userData?.isAdmin}
                    uid={uid}
                    classId={classItem.id}
                  />
                ))
              ) : (
                <div className="flex justify-center w-full">
                  <Empty description="No classes found" />
                </div>
              )}
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Classes" key="2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin />
            </div>
          ) : (
            <div className="flex mt-5 items-center h-full gap-2 flex-wrap">
              {myClasses.length > 0 ? (
                myClasses.map((classItem, index) => (
                  <ClassCards
                    key={index}
                    avatar={classItem.profilePic}
                    title={classItem.name}
                    description={classItem.description}
                    isAdmin={userData?.isAdmin}
                    uid={uid}
                    classId={classItem.id}
                  />
                ))
              ) : (
                <div className="flex justify-center w-full">
                  <Empty description="No classes found" />
                </div>
              )}
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Classes;
