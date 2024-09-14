// "use client";
// import React, { useEffect, useState } from "react";
// import { Select, Modal, Button, Input, Form, Collapse } from "antd";
// import axios from "axios";

// const ClassBooksAndSessions = ({ params }) => {
//   const [books, setBooks] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [isAddingBookVisible, setIsAddingBookVisible] = useState(false);
//   const [isAddingSessionVisible, setIsAddingSessionVisible] = useState(false);
//   const [newBookTitle, setNewBookTitle] = useState("");
//   const [newBookDescription, setNewBookDescription] = useState("");
//   const [newSessionTitle, setNewSessionTitle] = useState("");
//   const [newSessionDescription, setNewSessionDescription] = useState("");
//   const fetchClassData = async () => {
//     try {
//       const response = await axios.get(
//         `/api/getClassBooksAndSessions?classId=${params.classId}`
//       );
//       const data = await response.json();
//       setBooks(data.books);
//       setSessions(data.sessions);
//     } catch (error) {
//       console.error("Error fetching class data:", error);
//     }
//   };
//   useEffect(() => { 
    

//     fetchClassData();
//   }, [params.classId]);

//   const handleAddBook = async () => {
//     // ... validation and other logic
//     try {
//       const response = await axios.post("/api/addClassBook", {
//         classId: params.classId,
//         bookTitle: newBookTitle,
//         bookDescription: newBookDescription,
//       });
//       console.log(response.data); // Handle success or error
//       setNewBookTitle("");
//       setNewBookDescription("");
//       setIsAddingBookVisible(false);
//       fetchClassData();
//     } catch (error) {
//       console.error("Error adding book:", error);
//     }
//   };

//   const handleAddSession = async () => {
//     // ... validation and other logic
//     try {
//       const response = await axios.post("/api/addClassSession", {
//         classId: params.classId,
//         sessionTitle: newSessionTitle,
//         sessionDescription: newSessionDescription,
//       });
//       console.log(response.data); // Handle success or error
//       setNewSessionTitle("");
//       setNewSessionDescription("");
//       setIsAddingSessionVisible(false);
//       fetchClassData();
//     } catch (error) {
//       console.error("Error adding session:", error);
//     }
//   };

//   return (
//     <div className="p-5">
//       <Select mode="multiple" placeholder="Select Books" style={{ width: "100%" }}>
//         {books.map((book) => (
//           <Select.Option value={book.title} key={book.title}>{book.title}</Select.Option>
//         ))}
//       </Select>
//       <Button type="primary" onClick={() => setIsAddingBookVisible(true)}>
//         Add New Book
//       </Button>
//       <Modal
//         title="Add Book"
//         visible={isAddingBookVisible}
//         onOk={handleAddBook}
//         onCancel={() => setIsAddingBookVisible(false)}
//       >
//         <Form layout="vertical">
//           <Form.Item label="Title">
//             <Input value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description">
//             <Input.TextArea
//               value={newBookDescription}
//               onChange={(e) => setNewBookDescription(e.target.value)}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Select mode="multiple" placeholder="Select Sessions" style={{ width: "100%" }}>
//         {sessions.map((session) => (
//           <Select.Option value={session} key={session}>{session}</Select.Option>
//         ))}
//       </Select>
//       <Button type="primary" onClick={() => setIsAddingSessionVisible(true)}>
//         Add New Session
//       </Button>
//       <Modal
//         title="Add Session"
//         visible={isAddingSessionVisible}
//         onOk={handleAddSession}
//         onCancel={() => setIsAddingSessionVisible(false)}
//       >
//         <Form layout="vertical">
//           <Form.Item label="Title">
//             <Input value={newSessionTitle} onChange={(e) => setNewSessionTitle(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description">
//             <Input.TextArea
//               value={newSessionDescription}
//               onChange={(e) => setNewSessionDescription(e.target.value)}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ClassBooksAndSessions;


// "use client";
// import React, { useEffect, useState } from "react";
// import { Select, Modal, Button, Input, Form, Collapse } from "antd";
// import axios from "axios";
// import CollapseMenu from "@/app/components/LandingPageComponents/CollapseMenu";

// const ClassBooksAndSessions = ({ params }) => {
//   const [books, setBooks] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [isAddingBookVisible, setIsAddingBookVisible] = useState(false);
//   const [isAddingSessionVisible, setIsAddingSessionVisible] = useState(false);
//   const [newBookTitle, setNewBookTitle] = useState("");
//   const [newBookDescription, setNewBookDescription] = useState("");
//   const [newSessionTitle, setNewSessionTitle] = useState("");
//   const [newSessionDescription, setNewSessionDescription] = useState("");

//   const fetchClassData = async () => {
//     try {
//       const response = await axios.get(
//         `/api/getClassBooksAndSessions?classId=${params.classId}`
//       );
//       const data = await response.json();
//       const { books: bookRefs, sessions: sessionRefs } = data;

//       // Fetch book and session data concurrently
//       const [fetchedBooks, fetchedSessions] = await Promise.all([
//         fetchBookData(bookRefs),
//         fetchSessionData(sessionRefs),
//       ]);

//       setBooks(fetchedBooks);
//       setSessions(fetchedSessions);
//     } catch (error) {
//       console.error("Error fetching class data:", error);
//     }
//   };

//   const fetchBookData = async (bookRefs) => {
//     const bookPromises = bookRefs.map(async (bookRef) => {
//       // Replace with your logic to fetch data from the books collection using the reference
//       const response = await axios.get(`/api/books/${bookRef.id}`); // Assuming an API endpoint for book details
//       return response.data;
//     });
//     return await Promise.all(bookPromises);
//   };

//   const fetchSessionData = async (sessionRefs) => {
//     const sessionPromises = sessionRefs.map(async (sessionRef) => {
//       // Replace with your logic to fetch data from the sessions collection using the reference
//       const response = await axios.get(`/api/sessions/${sessionRef.id}`); // Assuming an API endpoint for session details
//       return response.data;
//     });
//     return await Promise.all(sessionPromises);
//   };

//   useEffect(() => {
//     fetchClassData();
//   }, [params.classId]);

//   const handleAddBook = async () => {
//     // ... validation and other logic
//     try {
//       const response = await axios.post("/api/addClassBook", {
//         classId: params.classId,
//         bookTitle: newBookTitle,
//         bookDescription: newBookDescription,
//       });
//       console.log(response.data); // Handle success or error
//       setNewBookTitle("");
//       setNewBookDescription("");
//       setIsAddingBookVisible(false);
//       fetchClassData();
//     } catch (error) {
//       console.error("Error adding book:", error);
//     }
//   };

//   const handleAddSession = async () => {
//     // ... validation and other logic
//     try {
//       const response = await axios.post("/api/addClassSession", {
//         classId: params.classId,
//         sessionTitle: newSessionTitle,
//         sessionDescription: newSessionDescription,
//       });
//       console.log(response.data); // Handle success or error
//       setNewSessionTitle("");
//       setNewSessionDescription("");
//       setIsAddingSessionVisible(false);
//       fetchClassData();
//     } catch (error) {
//       console.error("Error adding session:", error);
//     }
//   };

//   const bookItems = books.map((book) => (
//     <Collapse.Panel header={book.title} key={book.id}>
//       <p>{book.description || "No description available"}</p>
//     </Collapse.Panel>
//   ));

//   const sessionItems = sessions.map((session) => (
//     <Collapse.Panel header={session.title} key={session.id}>
//       <p>{session.description || "No description available"}</p>
//     </Collapse.Panel>
//   ));

//   return (
//     <div>
//       {/* <Select mode="multiple" placeholder="Select Books" style={{ width: "100%" }}>
//         {books.map((book) => (
//           <Select.Option value={book.title} key={book.id}>{book.title}</Select.Option>
//         ))}
//       </Select> */}
//       <Button type="primary" onClick={() => setIsAddingBookVisible(true)}>
//         Add New Book
//       </Button>
//       <Modal
//         title="Add Book"
//         visible={isAddingBookVisible}
//         onOk={handleAddBook}
//         onCancel={() => setIsAddingBookVisible(false)}
//       >
//         <Form layout="vertical">
//           <Form.Item label="Title">
//             <Input value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description">
//             <Input.TextArea
//               value={newBookDescription}
//               onChange={(e) => setNewBookDescription(e.target.value)}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* <Select mode="multiple" placeholder="Select Sessions" style={{ width: "100%" }}>
//         {sessions.map((session) => (
//           <Select.Option value={session.title} key={session.id}>{session.title}</Select.Option>
//         ))}
//       </Select> */}
//       <Button type="primary" onClick={() => setIsAddingSessionVisible(true)}>
//         Add New Session
//       </Button>
//       <Modal
//         title="Add Session"
//         visible={isAddingSessionVisible}
//         onOk={handleAddSession}
//         onCancel={() => setIsAddingSessionVisible(false)}
//       >
//         <Form layout="vertical">
//           <Form.Item label="Title">
//             <Input value={newSessionTitle} onChange={(e) => setNewSessionTitle(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description">
//             <Input.TextArea
//               value={newSessionDescription}
//               onChange={(e) => setNewSessionDescription(e.target.value)}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>

//     </div>
//   );
// };

// export default ClassBooksAndSessions;




"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, Collapse } from "antd";
import axios from "axios";

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
      const data = await response.json();
      const { books: bookRefs, sessions: sessionRefs } = data;

      // Fetch book and session data concurrently
      const [fetchedBooks, fetchedSessions] = await Promise.all([
        fetchBookData(bookRefs),
        fetchSessionData(sessionRefs),
      ]);

      setBooks(fetchedBooks);
      setSessions(fetchedSessions);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const fetchBookData = async (bookRefs) => {
    const bookPromises = bookRefs.map(async (bookRef) => {
      // Replace with your logic to fetch data from the books collection using the reference
      const response = await axios.get(`/api/books/${bookRef.id}`); // Assuming an API endpoint for book details
      return response.data;
    });
    return await Promise.all(bookPromises);
  };

  const fetchSessionData = async (sessionRefs) => {
    const sessionPromises = sessionRefs.map(async (sessionRef) => {
      // Replace with your logic to fetch data from the sessions collection using the reference
      const response = await axios.get(`/api/sessions/${sessionRef.id}`); // Assuming an API endpoint for session details
      return response.data;
    });
    return await Promise.all(sessionPromises);
  };

  useEffect(() => {
    fetchClassData();
  }, [params.classId]);

  const handleAddBook = async () => {
    // ... validation and other logic
    try {
      const response = await axios.post("/api/addClassBook", {
        classId: params.classId,
        bookTitle: newBookTitle,
        bookDescription: newBookDescription,
      });
      console.log(response.data); // Handle success or error
      setNewBookTitle("");
      setNewBookDescription("");
      setIsAddingBookVisible(false);
      fetchClassData();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleAddSession = async () => {
    // ... validation and other logic
    try {
      const response = await axios.post("/api/addClassSession", {
        classId: params.classId,
        sessionTitle: newSessionTitle,
        sessionDescription: newSessionDescription,
      });
      console.log(response.data); // Handle success or error
      setNewSessionTitle("");
      setNewSessionDescription("");
      setIsAddingSessionVisible(false);
      fetchClassData();
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const bookItems = books.map((book) => ({
    key: book.id,
    label: book.title,
    children: <p>{book.description || "No description available"}</p>,
  }));

  const sessionItems = sessions.map((session) => ({
    key: session.id,
    label: session.title,
    children: <p>{session.description || "No description available"}</p>,
  }));

  return (
    <div>
      <Button type="primary" onClick={() => setIsAddingBookVisible(true)}>
        Add New Book
      </Button>
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

      <Button type="primary" onClick={() => setIsAddingSessionVisible(true)}>
        Add New Session
      </Button>
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
    </div>
  );
};

export default ClassBooksAndSessions;