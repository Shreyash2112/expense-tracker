import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

export function useAddTransaction() {
  const { id } = useGetUserInfo();
  async function addTransaction({
    description,
    transactionAmount,
    transactionType,
  }) {
    try {
      await addDoc(collection(db, "transactions"), {
        userId: id,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding Document", e);
    }
  }

  return { addTransaction };
}
