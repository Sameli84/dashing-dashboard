import { doc, getDoc, getDocs, collection, query, where, updateDoc, addDoc, Timestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../config/firebase';

const uuid = 'E4a0kxFPy5hQOCf8fWKPCXBnDUi1'; // TODO: get uuid from auth
const todosRef = doc(db, 'Todos', uuid);

// return all document data under Todos/uuid
const getTodos = async () => {
  try {
    const docSnap = await getDoc(todosRef);
    if (docSnap.exists()) {
      return docSnap.data().TodoList;
    } else {
      // doc.data() will be undefined in this case
      console.log('No Todos document');
    }
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

// add new item to TodoList
// todo in format {'Priority': 1, 'Title', 'Example'}
// you can also add Deadline, but that needs to be a Date() object
const addTodo = async (todo) => {
  try {
    await updateDoc(todosRef, {
      TodoList: arrayUnion(todo),
    });
  } catch (e) {
    console.log('Error updating document, reason: ', e);
  }
};

// deletes given todo object from TodoList
// whole object must be provided, otherwise nothing happens
const deleteTodo = async (todo) => {
  try {
    await updateDoc(todosRef, {
      TodoList: arrayRemove(todo),
    });
  } catch (e) {
    console.log('Error updating document, reason: ', e);
  }
};

// returns array of all documents under Feelings/uuid/Entries
const getAllFeelings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Feelings/' + uuid, 'Entries'));
    var feelingsData = [];
    querySnapshot.forEach((doc) => {
      feelingsData.push(doc.data());
    });
    console.log(feelingsData);
    return feelingsData;
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

// returns one document according to given date from Feelings/uuid/Entries
const getFeelingsByDate = async (date) => {
  try {
    // we need to query database with a date range
    var end = new Date(date.getTime());
    end.setHours(23, 59, 59, 999);

    const q = query(collection(db, 'Feelings/' + uuid, 'Entries'), where('Time', '>=', date), where('Time', '<=', end));
    const querySnapshot = await getDocs(q);

    // snapshot should only have one document, if it is found
    if (querySnapshot.docs.length !== 0) {
      return querySnapshot.docs[0].data().Feels;
    } else {
      return undefined;
    }
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

const getFeelingsDocumentByDate = async (date) => {
  try {
    var end = new Date(date.getTime());
    end.setHours(23, 59, 59, 999);

    const q = query(collection(db, 'Feelings/' + uuid, 'Entries'), where('Time', '>=', date), where('Time', '<=', end));
    const querySnapshot = await getDocs(q);

    // snapshot should only have one document, if it is found
    if (querySnapshot.docs.length !== 0) {
      return querySnapshot.docs[0];
    } else {
      return undefined;
    }
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

// add a new feeling to given date
const addFeeling = async (date, feeling) => {
  try {
    var document = await getFeelingsDocumentByDate(date);
    if (document == undefined) {
      // if feelingsList is undefined (empty), create new document in database
      const docRef = await addDoc(collection(db, 'Feelings/' + uuid, 'Entries'), {
        Feels: [feeling],
        Time: Timestamp.fromDate(date),
      });
      console.log('Document written with ID: ', docRef.id);
    } else {
      const docRef = doc(db, 'Feelings/' + uuid + '/Entries', document.id);
      await updateDoc(docRef, {
        Feels: arrayUnion(feeling),
      });
    }
  } catch (e) {
    console.log('Error updating entry, reason: ', e);
  }
};

// delete feeling of given date
const deleteFeeling = async (date, feeling) => {
  try {
    var document = await getFeelingsDocumentByDate(date);
    if (document == undefined) {
      // no document, nothing to delete
      return;
    } else {
      const docRef = doc(db, 'Feelings/' + uuid + '/Entries', document.id);
      await updateDoc(docRef, {
        Feels: arrayRemove(feeling),
      });
    }
  } catch (e) {
    console.log('Error while deleting from Feels, reason: ', e);
  }
};

export { getTodos, getAllFeelings, getFeelingsByDate, addTodo, deleteTodo, addFeeling, deleteFeeling };
