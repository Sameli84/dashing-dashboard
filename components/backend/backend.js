import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const uuid = 'E4a0kxFPy5hQOCf8fWKPCXBnDUi1'; // TODO: get uuid from auth
const todosRef = doc(db, 'Todos', uuid);

const getTodos = async () => {
  try {
    const docSnap = await getDoc(todosRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No Todos document!');
    }
  } catch (e) {
    console.log('Error getting document from database');
  }
};

export { getTodos };
