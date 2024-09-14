"use client"
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Spin, Empty, Button, Modal, Input, Form, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { addDoc, collection, db } from 'firebase/firestore'; // Import Firebase functions
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import Cards from '@/app/components/LandingPageComponents/Cards';

const Classes = ({ params }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [isAddingClass, setIsAddingClass] = useState(false); // State for adding class

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const uid = params.uid;

  const fetchClasses = async () => {
    try {
      const response = await fetch(`/api/classes?uid=${uid}`);
      const data = await response.json();
      setClasses(data.classes);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchClasses();
    }
  }, [uid]);

  const handleAddClass = async () => {
    setIsAddingClass(true); // Set loading state for button
    if (!className || !classDescription) {
      console.error('Please enter class name and description');
      setIsAddingClass(false);
      return;
    }

    try {
      const response = await axios.post("/api/classes", {
        className,
        classDescription,
        uid,
        user,
      });
      message.success("Class Added");
      setClassName('');
      setClassDescription('');
      setIsModalVisible(false);
      setIsAddingClass(false); // Reset loading state for button
      fetchClasses();
    } catch (error) {
      message.error("Error Adding Class");
      console.error('Error adding class:', error);
      setIsAddingClass(false); // Reset loading state for button
    }
  };

  return (
    <div className="p-5">
      <Button
        icon={<PlusCircleOutlined />}
        onClick={() => setIsModalVisible(true)}
        loading={isAddingClass} // Set loading icon when adding class
      >
        Add New Class
      </Button>

      <Modal
        title="Add Class"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddClass}
      >
        <Form layout="vertical">
          <Form.Item label="Class Name">
            <Input value={className} onChange={(e) => setClassName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea value={classDescription} onChange={(e) => setClassDescription(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin />
        </div>
      ) : (
        <div className="flex mt-5 items-center h-full gap-2 flex-wrap">
          {classes.length > 0 ? (
            classes.map((className, index) => (
              <Cards avatar={className.profilePic} title={className.name} description={className.description} />
            ))
          ) : (
            <Empty description="No classes found" />
          )}
        </div>
      )}
    </div>
  );
};

export default Classes;