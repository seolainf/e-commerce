import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getAllProducts = async (database) => {
  const colRef = collection(db, `${database}`);
  const querySnapshot = await getDocs(colRef);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const getRandomProducts = async (count, database) => {
  const data = await getAllProducts(database);
  const max = data.length - count;
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return data.slice(start, start + count);
};

export const getProductBySlug = async (slug, database) => {
  const colRef = collection(db, `${database}`);
  const q = query(colRef, where("slug", "==", `${slug}`));

  const querySnapshot = await getDocs(q);
  const item = [];
  querySnapshot.forEach((doc) => {
    item.push({ id: doc.id, ...doc.data() });
  });
  return item;
};

export const getProductNew = async (type) => {
  const colRef = collection(db, "products");
  const q = query(colRef, where("categories", "array-contains", `${type}`));
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const getUserById = async (id) => {
  const docRef = doc(db, "users", `${id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
  }
};
