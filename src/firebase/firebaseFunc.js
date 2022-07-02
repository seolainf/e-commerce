import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const colRef = collection(db, "products");

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(colRef);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const getRandomProducts = async (count) => {
  const data = await getAllProducts();
  const max = data.length - count;
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return data.slice(start, start + count);
};
