import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export function useAuthentication() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    
    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    async function createUser(data) {
        checkIfIsCancelled();

        setLoading(true);
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            
            setLoading(false)
            return user;

        }catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes('user-not-found') || error.message.includes('wrong-password')) {
                systemErrorMessage = error.message.replace('Firebase: ', '');
            } else {
                systemErrorMessage = 'There was an error, please try again later';
            }

            setError(systemErrorMessage)
            setLoading(false)
        }

    };

    function logout() {
        checkIfIsCancelled()

        signOut(auth)
    };

    async function login(data) {
        checkIfIsCancelled();

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes('wrong-password')) {
                systemErrorMessage = 'Incorrect password, please try again';
            } else if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Incorrect email, please try again';
            } else {
                systemErrorMessage = 'There was an error, please try again later';
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }


    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };

}