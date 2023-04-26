import { auth } from '../config/firebase.mock'; // use the mock version of firebase config
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

describe('User creation and login with firebase', () => {
  let uuid;
  const email = process.env.JEST_USER_EMAIL;
  const password = process.env.JEST_USER_PASSWORD;

  test('should create a new user', async () => {
    expect(auth.currentUser?.uid).toBeFalsy();

    const response = await createUserWithEmailAndPassword(auth, email, password);
    expect(response).toBeTruthy();
    expect(auth.currentUser?.uid).toBeTruthy();
    uuid = auth.currentUser?.uid;

    // set display name to the users profile after creating user
    await updateProfile(auth.currentUser, {
      displayName: 'Test User',
    });
    expect(auth.currentUser?.displayName).toEqual('Test User');
    auth.signOut();
  });

  test('should not create a new user with the same email', async () => {
    expect(auth.currentUser?.uid).toBeFalsy();
    await expect(createUserWithEmailAndPassword(auth, email, password)).rejects.toThrow('Firebase: Error (auth/email-already-in-use).');
    expect(auth.currentUser).toBeFalsy();
  });

  test('should login with valid credentials', async () => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    expect(userCredentials.user.email).toEqual(email);
    expect(userCredentials.user.uid).toEqual(uuid);
    await deleteUser(auth.currentUser); // doesn't return anything to check
  });

  test('should not login to a nonexistent user', async () => {
    await expect(signInWithEmailAndPassword(auth, email, password)).rejects.toThrow('Firebase: Error (auth/user-not-found).');
    expect(auth.currentUser).toBeFalsy();
  });
});
