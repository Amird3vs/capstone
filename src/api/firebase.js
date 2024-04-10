import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import router from "@/router";
import store from "@/store";
import Swal from 'sweetalert2'

const firebaseConfig = {
    apiKey: "AIzaSyBK-3Y6SRKwQQ9pj4dUgWenl409n0DPFJA",
    authDomain: "capstone-5cee0.firebaseapp.com",
    projectId: "capstone-5cee0",
    storageBucket: "capstone-5cee0.appspot.com",
    messagingSenderId: "346693358320",
    appId: "1:346693358320:web:a9380bfb510b705a6c2835"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        return user;
    } catch (error) {
        Swal.fire({
            title: "Can't sign in",
            text: `Error signing in with Google: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Try again',
        });
        throw error;
    }
};

export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        return user;
    } catch (error) {
        console.error('Error signing in with Facebook:', error.message);
        Swal.fire({
            title: "Can't sign in",
            text: `Error signing in with Facebook: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Try again',
        });
        throw error;
    }
};

export const signInWithTwitter = async () => {
    try {
        const result = await signInWithPopup(auth, twitterProvider);
        const user = result.user;
        return user;
    } catch (error) {
        console.error('Error signing in with Twitter:', error.message);
        Swal.fire({
            title: "Can't sign in",
            text: `Error signing in with Twitter: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Try again',
        });
        throw error;
    }
};

export const signOutUser = async () => {
    try {
        const isUserLoggedIn = auth.currentUser;
        const swalConfig = isUserLoggedIn
            ? {
                title: 'Logout',
                text: 'Are you sure you want to logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Logout',
                cancelButtonText: 'Cancel'
            }
            : {
                title: 'Logout',
                text: 'You are already logged out.',
                icon: 'info',
                confirmButtonText: 'OK'
            };
        const result = await Swal.fire(swalConfig);
        if (result.isConfirmed && isUserLoggedIn) {
            await signOut(auth);
            localStorage.removeItem('user');
            router.push({ name: 'Signin' });
            window.location.reload();
        } else if (!isUserLoggedIn) {
            router.push({ name: 'Signin' });
        }
    } catch (error) {
        console.error('Error signing out:', error.message);
        await Swal.fire({
            title: "Can't sign out",
            text: `Error signing out: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
        }).then(() => {
            router.push({ name: 'Signin' });
        });
        throw error;
    }
};

export const handleSuccessfulLogin = (user) => {
    store.commit('setUser', user)
    router.push({ name: 'Profile' });
};
