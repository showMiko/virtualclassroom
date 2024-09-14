import { db } from '@/util/firebase';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return new Response(JSON.stringify({ error: 'Missing uid parameter' }), { status: 400 });
  }

  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      console.log("SnapShot Exists");
      const userData = userDocSnapshot.data();
      const classRefs = userData.classes || []; // Access the 'classes' array
      const classes=[];
      for (const classRef of classRefs) {
        const classDocSnapshot = await getDoc(classRef);
        if (classDocSnapshot.exists()) {
          classes.push({ id: classDocSnapshot.id, ...classDocSnapshot.data() });
        }
      }


      return new Response(JSON.stringify({ classes }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { status: 500 });
  }
}



export async function POST(req) {
  const data = await req.json();
  const { uid, className, classDescription,user } = data;
  const profilePic=user.photoURL || "";
  if (!uid || !className || !classDescription) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  try {
    // Create a new class document in Firestore
    const classesRef = collection(db, 'classes');
    const newClassDoc = await addDoc(classesRef, {
      uid,
      profilePic,
      name: className,
      books: [],
      sessions: [],
      description: classDescription,
    });

    const newClassRef = doc(db, 'classes', newClassDoc.id);
    // Update user's classes array with the document reference
    const updateUserRef = doc(db, 'users', uid);
    await updateDoc(updateUserRef, {
      classes: arrayUnion(newClassRef), // Use FieldValue.arrayUnion for adding references
    });

    return new Response(JSON.stringify({ message: 'Class added successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error adding class:', error);
    return new Response(JSON.stringify({ error: 'Failed to add class' }), { status: 500 });
  }
}