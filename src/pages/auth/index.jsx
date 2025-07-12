import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate, Navigate } from "react-router-dom";

import { useGetUserInfo } from "../../hooks/useGetUserInfo"

import "./style.css"

export default function Auth() {

    const navigate = useNavigate()

    const { isActive } = useGetUserInfo()

    async function signInWithGoogle() {
        const result = await signInWithPopup(auth, provider)
        const userAuthInfo = {
            id: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isActive: true
        };

        localStorage.setItem("auth", JSON.stringify(userAuthInfo));
        navigate("/expense-tracker")
    }

    if (isActive) {
        return <Navigate to="/expense-tracker" />;
    }

    return (
        <div className="login-page">
            <p>Sign in with Google to continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}