// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/util/firebase';

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const classId = searchParams.get('classId');

//   if (!classId) {
//     return new Response(JSON.stringify({ error: 'Missing classId parameter' }), { status: 400 });
//   }

//   try {
//     const classDocRef = doc(db, 'classes', classId);
//     const classDocSnapshot = await getDoc(classDocRef);

//     if (classDocSnapshot.exists()) {
//       const classData = classDocSnapshot.data();
//       const { books, sessions } = classData;
//       console.log(books);
//       return new Response(JSON.stringify({ books, sessions }), { status: 200 });
//     } else {
//       return new Response(JSON.stringify({ error: 'Class not found' }), { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error fetching class data:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch class data' }), { status: 500 });
//   }
// }


import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/util/firebase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get('classId');

  if (!classId) {
    return new Response(JSON.stringify({ error: 'Missing classId parameter' }), { status: 400 });
  }

  try {
    const classDocRef = doc(db, 'classes', classId);
    const classDocSnapshot = await getDoc(classDocRef);

    if (classDocSnapshot.exists()) {
      const classData = classDocSnapshot.data();
      const { books, sessions } = classData;

      // Fetch data from sessions collection
      const sessionPromises = sessions.map(async (sessionRef) => {
        const sessionDocSnapshot = await getDoc(sessionRef);
        return sessionDocSnapshot.data();
      });
      const fetchedSessions = await Promise.all(sessionPromises);

      // Fetch data from books collection
      const bookPromises = books.map(async (bookRef) => {
        const bookDocSnapshot = await getDoc(bookRef);
        return bookDocSnapshot.data();
      });
      const fetchedBooks = await Promise.all(bookPromises);

      return new Response(
        JSON.stringify({ books: fetchedBooks, sessions: fetchedSessions }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ error: 'Class not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching class data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch class data' }), { status: 500 });
  }
}