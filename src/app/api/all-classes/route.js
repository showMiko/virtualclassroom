import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/util/firebase';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const classesRef = collection(db, 'classes');
    const querySnapshot = await getDocs(classesRef);
    const classes = querySnapshot.docs.map((doc) =>({id:doc.id,...doc.data()}));
    // const classes= querySnapshot.d
    console.log(classes);
    return new Response(JSON.stringify({ classes }), { status: 200 });
  } catch (error) {
    console.error('Error fetching all classes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch all classes' }), { status: 500 });
  }
}