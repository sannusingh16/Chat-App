import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


const config={
  apiKey: "AIzaSyDebc6rnTMyO4zVYhBIUV11q_L-46hINgo",
  authDomain: "chat-app-efe4f.firebaseapp.com",
  databaseURL: "https://chat-app-efe4f-default-rtdb.firebaseio.com",
  projectId: "chat-app-efe4f",
  storageBucket: "chat-app-efe4f.appspot.com",
  messagingSenderId: "101567791284",
  appId: "1:101567791284:web:873bcb4452a2e5c56957e1"
};

const app=firebase.initializeApp(config);
export const auth=app.auth();
export const database=app.database();
export const storage=app.storage();