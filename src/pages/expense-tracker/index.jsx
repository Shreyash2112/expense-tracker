import { useState } from "react"

import { signOut } from "firebase/auth"

import { auth } from "../../config/firebase-config"
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTrasactions } from "../../hooks/useGetTransactions"
import { useGetUserInfo } from "../../hooks/useGetUserInfo"

import { useNavigate } from "react-router-dom"

import "./style.css"

export default function Expense() {

    const { addTransaction } = useAddTransaction()
    const { transactions, transactionTotal } = useGetTrasactions()
    const { name, profilePhoto } = useGetUserInfo()

    const [description, setDescription] = useState("")
    const [transactionAmount, setTransactionAmount] = useState()
    const [transactionType, setTransactionType] = useState("income")

    const navigate = useNavigate()

    const { balance, totalIncome, totalExpenses } = transactionTotal


    async function onSubmit(e) {
        e.preventDefault()
        addTransaction({ description, transactionAmount, transactionType })
        setDescription("")
        setTransactionAmount()
    }

    async function signUserOut() {
        signOut(auth).then(() => {
            localStorage.removeItem("auth")
            navigate("/")
        }).catch((e) => {
            console.error(e);
        })
    }

    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1> {name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your balance</h3>
                        {balance >= 0 ?
                            (<h2>₹{balance.toLocaleString()}</h2>)
                            : (<h2>-₹{(balance * -1).toLocaleString()}</h2>)
                        }
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>₹{totalIncome.toLocaleString()}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>₹{totalExpenses.toLocaleString()}</p>
                        </div>
                    </div>

                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            required
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />

                        <input
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={transactionType === "expense"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense">Expense</label>

                        <input
                            type="radio"
                            id="income"
                            value="income"
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income">Income</label>

                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
                {profilePhoto && (
                    <div className="profile">
                        <img className="profile-photo" src={profilePhoto} alt="Profile photo" />
                        <button className="sign-out-button" onClick={signUserOut}>Sign out</button>
                    </div>
                )}
            </div>

            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction, idx) => {
                        const { description, transactionAmount, transactionType } = transaction

                        return (
                            <li key={idx}>
                                <h4>{description}</h4>
                                <p>₹{transactionAmount} . <label style={{ color: transactionType === "income" ? "green" : "red" }}>{transactionType}</label></p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}