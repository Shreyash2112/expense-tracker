import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

export function useGetTrasactions() {
  const [transactions, setTransactions] = useState([]);
  const { id } = useGetUserInfo();

  async function getTransactions() {
    let unsubscribe;
    try {
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", id),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setTransactions(docs);
      });
    } catch (e) {
      console.error(e);
    }
    return () => unsubscribe();
  }

  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions };
}
