import { doc, updateDoc, addDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '@/util/firebase';

export async function POST(req) {
  const data = await req.json();
  const { classId, sessionTitle, sessionDescription } = data;

  if (!classId || !sessionTitle || !sessionDescription) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  try {
    const lectures=[];
    // Create a new session document in Firestore
    const sessionsRef = collection(db, 'sessions');
    const newSessionDoc = await addDoc(sessionsRef, {
      title: sessionTitle,
      description: sessionDescription,
      lectures
    });

    // Update the class document with the new session reference
    const classDocRef = doc(db, 'classes', classId);
    const newClassRef = doc(db, 'sessions', newSessionDoc.id);
    await updateDoc(classDocRef, {
      sessions: arrayUnion(newClassRef),
    });

    return new Response(JSON.stringify({ message: 'Session added successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error adding session:', error);
    return new Response(JSON.stringify({ error: 'Failed to add session' }), { status: 500 });
  }
}