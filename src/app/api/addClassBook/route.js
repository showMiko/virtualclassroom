import { doc, updateDoc, addDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '@/util/firebase';

export async function POST(req) {
  const data = await req.json();
  const { classId, bookTitle, bookDescription } = data;

  if (!classId || !bookTitle || !bookDescription) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  try {
    // Create a new book document in Firestore
    const bookDocs=[];
    const booksRef = collection(db, 'books');
    const newBookDoc = await addDoc(booksRef, {
      title: bookTitle,
      description: bookDescription,
      bookDocs
    });

    // Update the class document with the new book reference
    const classDocRef = doc(db, 'classes', classId);

    const newClassRef = doc(db, 'books', newBookDoc.id);
    await updateDoc(classDocRef, {
      books: arrayUnion(newClassRef),
    });

    return new Response(JSON.stringify({ message: 'Book added successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error adding book:', error);
    return new Response(JSON.stringify({ error: 'Failed to add book' }), { status: 500 });
  }
}