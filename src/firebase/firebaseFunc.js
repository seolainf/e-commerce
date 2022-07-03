import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

export const getProductById = async (id) => {
  const docRef = doc(db, "products", `${id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};
