import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInWithApple() {
    async function appleLogin() {
        try {
            const provider = new OAuthProvider("apple.com");

            // Request email + name from Apple
            provider.addScope("email");
            provider.addScope("name");

            // Optional: Localize Apple login UI
            provider.setCustomParameters({
                locale: "en" // or "fr"
            });

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            const credential = OAuthProvider.credentialFromResult(result);
            const idToken = credential?.idToken;

            // Apple gives display name ONLY on first login
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: user.displayName || "",
                lastName: "",
                photo: "",
                appleIdToken: idToken
            });

            toast.success("User logged in with Apple successfully", {
                position: "top-center"
            });

            window.location.href = "/home";
        } catch (error) {
            console.error("Apple login error:", error);
            toast.error(error.message || "Apple Login failed", {
                position: "top-center"
            });
        }
    }

    return (
        <button type="button" className="social-login-btn" onClick={appleLogin}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                    d="M16.365 1.43c0 1.14-.42 2.26-1.19 3.13-.78.87-2.06 1.55-3.17 1.45-.12-1.08.47-2.24 1.21-2.97.81-.88 2.18-1.52 3.15-1.61zM20.37 17.35c-.55 1.31-.82 1.89-1.54 3.05-1 1.63-2.41 3.66-4.17 3.68-1.55.02-1.95-.99-4.06-.99-2.12 0-2.56 1-4.13.96-1.76-.03-3.11-1.85-4.11-3.48-2.82-4.7-3.12-10.2-1.38-13.1 1.25-2.03 3.23-3.22 5.1-3.22 1.95 0 3.18 1.08 4.79 1.08 1.55 0 2.5-1.09 4.83-1.09 1.69 0 3.48.92 4.73 2.5-4.15 2.27-3.48 8.25.71 10.71z"
                    fill="black"
                />
            </svg>
            Connect with Apple Account
        </button>
    );
}

export default SignInWithApple;