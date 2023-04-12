import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.mock'; // use the mock version of firebase config

// check that user can log in and returns same credentials with same email
describe('Login', () => {
  it('logs in with valid credentials', async () => {
    const email = process.env.JEST_USER_EMAIL;
    const password = process.env.JEST_USER_PASSWORD;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        expect(userCredential.user.email).toEqual(email);
      })
      .catch((error) => {
        alert(error);
      });
  });
});
