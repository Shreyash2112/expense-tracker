import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

export function useAddTransaction() {
  const { id } = useGetUserInfo();
  async function addTransaction({
    description,
    transactionAmount,
    transcationType,
  }) {
    try {
      await addDoc(collection(db, "transactions"), {
        userId: id,
        description,
        transactionAmount,
        transcationType,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Error adding Document", e);
    }
  }

  return { addTransaction };
}
