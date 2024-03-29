import { doc, getDoc, getDocs, collection, query, where, updateDoc, addDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

var uuid = '';

// method to get uuid
const getAuth = () => {
  auth.onAuthStateChanged(() => {
    if (auth.currentUser) {
      uuid = auth.currentUser.uid;
    }
  });
};
getAuth(); // call function

// return all document data under Todos/uuid
const getTodos = async () => {
  try {
    const docSnap = await getDoc(doc(db, 'Todos', uuid));
    if (docSnap.exists()) {
      console.log(docSnap.data().TodoList);
      return docSnap.data().TodoList;
    } else {
      // doc.data() will be undefined in this case
      console.log('No Todos document');
      return undefined;
    }
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

// add new item to TodoList
// todo in format {'Priority': 1, 'Title', 'Example'}
// you can also add Deadline, but that needs to be a unix timestamp
const addTodo = async (todo) => {
  try {
    const todos = await getTodos(); // check if document exists
    if (todos === undefined) {
      // if todos is undefined (empty), create new document in database
      await setDoc(doc(db, 'Todos/' + uuid), {
        TodoList: [todo],
      });
      console.log('New document added');
    } else {
      // update existing document with new data
      await updateDoc(doc(db, 'Todos', uuid), {
        TodoList: arrayUnion(todo),
      });
    }
  } catch (e) {
    console.log('Error updating document, reason: ', e);
  }
};

// deletes given todo object from TodoList
// whole object must be provided, otherwise nothing happens
const deleteTodo = async (todo) => {
  try {
    await updateDoc(doc(db, 'Todos', uuid), {
      TodoList: arrayRemove(todo),
    });
  } catch (e) {
    console.log('Error updating document, reason: ', e);
  }
};

// edit existing todos
// index is required
// you can leave other paramaters 'undefined' if you don't want to change those values
const editTodo = async (index, deadline, priority, complete, title) => {
  try {
    var todoList = await getTodos();
    if (index >= todoList.length || index < 0 || index === undefined) {
      console.log('Index out of bounds');
      return;
    } else {
      if (deadline !== undefined) todoList[index].Deadline = deadline;
      if (priority !== undefined) todoList[index].Priority = priority;
      if (complete !== undefined) todoList[index].Complete = complete;
      if (title !== undefined) todoList[index].Title = title;
      await updateDoc(doc(db, 'Todos', uuid), {
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
    return feelingsData;
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

// returns one document according to given date from Feelings/uuid/Entries
// date needs to be a unix timestamp number, i.e. Date.now()
const getFeelingsByDate = async (date) => {
  try {
    // start of date
    let start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start = start.getTime(); // convert start date to timestamp

    // end of date
    let end = new Date(date);
    end.setHours(23, 59, 59, 999);
    end = end.getTime(); // convert end date to timestamp

    const q = query(collection(db, 'Feelings/' + uuid, 'Entries'), where('Time', '>=', start), where('Time', '<=', end));
    const querySnapshot = await getDocs(q);

    // snapshot should only have one document, if it is found
    if (querySnapshot.docs.length !== 0) {
      console.log(querySnapshot.docs[0].data().Feels);
      return querySnapshot.docs[0].data().Feels;
    } else {
      return undefined;
    }
  } catch (e) {
    console.log('Error getting document from database, reason: ', e);
  }
};

// use date range to query feelings data
// startDate < endDate
// dates must be given in unix timestamp format (in milliseconds) as numbers
const getFeelingsByDateRange = async (start, end) => {
  try {
    let startTime = new Date(start);
    startTime.setHours(0, 0, 0, 0);
    startTime = startTime.getTime();

    let endTime = new Date(end);
    endTime.setHours(23, 59, 59, 999);
    endTime = endTime.getTime();

    const q = query(collection(db, 'Feelings/' + uuid, 'Entries'), where('Time', '>=', startTime), where('Time', '<=', endTime));
    const querySnapshot = await getDocs(q);

    var feelingsData = [];

    querySnapshot.docs.forEach((doc) => {
      feelingsData.push(doc.data());
    });
    return feelingsData;
  } catch (e) {
    console.log('Error getting documents from database, reason: ', e);
  }
};

// useful function to use inside this module
// not callable from outside
const getFeelingsDocumentByDate = async (date) => {
  try {
    // start of date
    let start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start = start.getTime(); // convert start date into timestamp

    // end of date
    let end = new Date(date);
    end.setHours(23, 59, 59, 999);
    end = end.getTime(); // convert end date into timestamp

    const q = query(collection(db, 'Feelings/' + uuid, 'Entries'), where('Time', '>=', start), where('Time', '<=', end));
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
// date needs to be unix timestamp number i.e. Date.now()
const addFeeling = async (date, feeling) => {
  try {
    const document = await getFeelingsDocumentByDate(date);
    if (document === undefined) {
      // if feelingsList is undefined (empty), create new document in database
      await setDoc(doc(db, 'Feelings', uuid), {}); // initialize empty doc
      await addDoc(collection(db, 'Feelings/' + uuid, 'Entries'), {
        Feels: [feeling],
        Time: date,
      });
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
    const document = await getFeelingsDocumentByDate(date);
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

export { getTodos, getAllFeelings, getFeelingsByDate, getFeelingsByDateRange, addTodo, deleteTodo, addFeeling, deleteFeeling, editTodo, editFeeling };
