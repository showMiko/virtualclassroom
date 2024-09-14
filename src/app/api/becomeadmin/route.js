import { auth, db } from '@/util/firebase';
import { updateDoc, doc } from 'firebase/firestore';

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return new Response(JSON.stringify({ error: 'Missing uid parameter' }), { status: 400 });
  }

  try {
    const userDocRef = doc(db, 'users', uid);
    const updatedData = { isAdmin: true }; // Update with the desired change

    await updateDoc(userDocRef, updatedData);

    return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating user data:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user data' }), { status: 500 });
  }
}