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

// edit existing todos
// index is required
// you can leave other paramaters 'undefined' if you don't want to change those values
const editTodo = async (index, deadline, priority, title) => {
  try {
    var todoList = await getTodos();
    if (index >= todoList.length || index < 0 || index === undefined) {
      console.log('Index out of bounds');
      return;
    } else {
      if (deadline !== undefined) todoList[index].Deadline = deadline;
      if (priority !== undefined) todoList[index].Priority = priority;
      if (title !== undefined) todoList[index].Title = title;
      await updateDoc(todosRef, {
        TodoList: todoList,
      });
    }
  } catch (e) {
    console.log('Error while editing TodoList, reason: ', e);
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

// useful function to use inside this module
// not callable from outside
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
    if (document === undefined) {
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

// delete feeling object of given date
// whole feeling object must be provided, otherwise nothing happens
const deleteFeeling = async (date, feeling) => {
  try {
    var document = await getFeelingsDocumentByDate(date);
    if (document === undefined) {
      // no document, nothing to delete
      return;
    } else {
      var docRef = doc(db, 'Feelings/' + uuid + '/Entries', document.id);
      await updateDoc(docRef, {
        Feels: arrayRemove(feeling),
      });
    }
  } catch (e) {
    console.log('Error while deleting from Feels, reason: ', e);
  }
};

// edit feeling
// date and index are required
// mood or time can be left undefined
const editFeeling = async (date, index, mood, time) => {
  try {
    const document = await getFeelingsDocumentByDate(date);
    if (document === undefined) {
      // no document, nothing to edit
      return;
    } else {
      var feelingsList = document.data().Feels;
      if (index >= feelingsList.length || index < 0 || index === undefined) {
        console.log('Index out of bounds');
        return;
      } else {
        if (mood !== undefined) feelingsList[index].Mood = mood;
        if (time !== undefined) feelingsList[index].Time = time;
        var docRef = doc(db, 'Feelings/' + uuid + '/Entries', document.id);
        await updateDoc(docRef, {
          Feels: feelingsList,
        });
      }
    }
  } catch (e) {
    console.log('Error while editing Feels, reason: ', e);
  }
};

export { getTodos, getAllFeelings, getFeelingsByDate, addTodo, deleteTodo, addFeeling, deleteFeeling, editTodo, editFeeling };
