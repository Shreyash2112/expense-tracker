import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

export default function Auth() {

    const navigate = useNavigate()
    async function signInWithGoogle() {

        const result = await signInWithPopup(auth, provider)
        console.log(result);
        const userAuthInfo = {
            id: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isActive: true
        };

        localStorage.setItem("auth", JSON.stringify(userAuthInfo));
        navigate("/expense-tracker")
    }

    return (
        <div className="login-page">
            <p>Sign in with Google to continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}