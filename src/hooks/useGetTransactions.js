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
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0.0,
    totalIncome: 0.0,
    totalExpenses: 0.0,
  });
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
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        let balance = totalIncome - totalExpenses;
        setTransactions(docs);
        setTransactionTotal({ balance, totalIncome, totalExpenses });
      });
    } catch (e) {
      console.error(e);
    }
    return () => unsubscribe();
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotal };
}
