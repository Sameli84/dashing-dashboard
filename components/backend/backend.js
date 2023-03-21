import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const uuid = 'E4a0kxFPy5hQOCf8fWKPCXBnDUi1'; // TODO: get uuid from auth

const stepsRef = doc(db, 'Steps', uuid);

const getSteps = async () => {
  const docSnap = await getDoc(stepsRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};

export { getSteps };
