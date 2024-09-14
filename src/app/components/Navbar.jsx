"use client"
import React, { useContext, useState } from 'react';
import { Avatar, Button, Dropdown, Menu, message, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import SignUp from './SignUp';
import {BookOutlined,HomeOutlined,ExclamationCircleFilled } from '@ant-design/icons';
import { auth } from '@/util/firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
const { confirm } = Modal;
const Navbar = () => {
  const {user,userData,setUserData}=useContext(AuthContext);  
  const router = useRouter();

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(`${e.key}/`);
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you want to become an Admin?',
      icon: <ExclamationCircleFilled />,
      content: 'This action is permanent and cannot be reverted',
      onOk() {
        handleAdmin();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    message.success("Logout Successful");
    router.push("/")
  };

  const handleAdmin=async()=>{
    try {
      const response =await axios.put(`/api/becomeadmin?uid=${user.uid}`)
      message.success("You are now an admin")
      axios.get(`/api/getUser?uid=${user.uid}`)
          .then((response) => {
            if (response.data.userData) {
              setUserData(response.data.userData);
            } else {
              console.error('Error fetching user data:', response.data.error);
            }
          })
    } catch (error) {
      message.error("Failed to assign rights");
    }
  }
  const [current, setCurrent] = useState('/');
  
  const items = [
    {
      label: 'Home',
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: 'Classes',
      key: `/classes/${user?user.uid:""}`,
      icon: <BookOutlined />,
    },
  ];

  return (
    <div className='flex flex-row p-3'>
      <div className='flex-1'>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
    <div className="flex-2 cursor-pointer">
      {user ? (
        <Dropdown overlay={<Menu>
          <Menu.Item onClick={handleLogout}>
            Logout
          </Menu.Item>
          {userData && userData.isAdmin===false && <Menu.Item  onClick={showConfirm}>Become an Admin</Menu.Item>
          }
        </Menu>}>
          <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
            <Avatar src={user.photoURL} alt={user.displayName} style={{ width: '40px', borderRadius: '50%', marginRight: '8px' }} />
            <span >{user.displayName}</span>
          </div>
        </Dropdown>
      ) : (
        <SignUp />
      )}
    </div>
    </div>
  );
};

export default Navbar;
