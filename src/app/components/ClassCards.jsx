// import React from 'react';
// import { BookFilled} from '@ant-design/icons';
// import { Avatar, Card, Button } from 'antd';
// const { Meta } = Card;

// const ClassCards = ({ title, description, avatar, isAdmin }) => (

//   <Card
//     style={{ width: 300 }}
//     actions={[
//       isAdmin ? (
//         <Button>
//           Show Details
//           <BookFilled key="session" onClick={handleCardClick}/>
//         </Button>
//       ) : (
//         <Button type="primary" onClick={() => console.log('Join class')}>
//           Join Now
//         </Button>
//       ),
//     ]}
//   >
//     <Meta
//       avatar={<Avatar src={avatar} />}
//       title={title}
//       description={description}
//     />
//   </Card>
// );

// export default ClassCards;

"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EditOutlined, EllipsisOutlined, SettingOutlined, BookFilled, FieldTimeOutlined } from '@ant-design/icons';
import { Avatar, Card, Button } from 'antd';
const { Meta } = Card;

const ClassCards = ({ title, description, avatar, isAdmin, classId,uid }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/classbooksandsessions/${classId}`);
  };

  useEffect(()=>{
    if(uid)
      console.log(uid,"uid")
    if(classId)
      console.log(classId,"Class Id")
  },[])

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        isAdmin ? (
          <Button onClick={handleCardClick}>
            Show Details
            <BookFilled key="session"  />
          </Button>
        ) : (
          <Button type="primary" onClick={() => console.log('Join class')}>
            Join Now
          </Button>
        ),
      ]}
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

export default ClassCards;