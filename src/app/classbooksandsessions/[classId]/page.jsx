"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, Collapse } from "antd";
import axios from "axios";

const { Panel } = Collapse;

const ClassBooksAndSessions = ({ params }) => {
  const [books, setBooks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isAddingBookVisible, setIsAddingBookVisible] = useState(false);
  const [isAddingSessionVisible, setIsAddingSessionVisible] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [newSessionDescription, setNewSessionDescription] = useState("");

  const fetchClassData = async () => {
    try {
      const response = await axios.get(
        `/api/getClassBooksAndSessions?classId=${params.classId}`
      );
      const data = await response.data; // Change to response.data

      setBooks(response.data.books);
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [params.classId]);

  const handleAddBook = async () => {
    try {
      const response = await axios.post("/api/addClassBook", {
        classId: params.classId,
        bookTitle: newBookTitle,
        bookDescription: newBookDescription,
      });
      console.log(response.data);
      setNewBookTitle("");
      setNewBookDescription("");
      setIsAddingBookVisible(false);
      fetchClassData();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleAddSession = async () => {
    try {
      const response = await axios.post("/api/addClassSession", {
        classId: params.classId,
        sessionTitle: newSessionTitle,
        sessionDescription: newSessionDescription,
      });
      console.log(response.data);
      setNewSessionTitle("");
      setNewSessionDescription("");
      setIsAddingSessionVisible(false);
      fetchClassData();
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  return (
    <div className="p-5 flex  flex-col justify-center gap-4">
      <div className="flex flex-row justify-spaced items-center gap-10">

      <Button onClick={() => setIsAddingBookVisible(true)}>
        Add New Book
      </Button>
      <Button onClick={() => setIsAddingSessionVisible(true)}>
        Add New Session
      </Button>
      </div>
      <Modal
        title="Add Book"
        visible={isAddingBookVisible}
        onOk={handleAddBook}
        onCancel={() => setIsAddingBookVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={newBookDescription}
              onChange={(e) => setNewBookDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Session"
        visible={isAddingSessionVisible}
        onOk={handleAddSession}
        onCancel={() => setIsAddingSessionVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={newSessionTitle} onChange={(e) => setNewSessionTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={newSessionDescription}
              onChange={(e) => setNewSessionDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Collapse>
        <Collapse.Panel header="Books" key="1">
          {books.map((book) => (
            <Collapse>
            <Collapse.Panel header={book.title} key={book.title}>
            <Panel header={book.title} key={book.id}>
              <p>{book.description || "No description available"}</p>
            </Panel>
            </Collapse.Panel>
            </Collapse>
          ))}
        </Collapse.Panel>
        </Collapse>
        <Collapse>
        <Collapse.Panel header="Sessions" key="2">
          {sessions.map((session) => (
            <Collapse>
            <Collapse.Panel header={session.title} key={session.title}>
            <Panel header={session.title} key={session.id}>
              <p>{session.description || "No description available"}</p>
            </Panel>
            </Collapse.Panel>
            </Collapse>
          ))}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default ClassBooksAndSessions;
