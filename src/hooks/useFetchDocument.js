import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export function useFetchDocument(docCollection, id) {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadDocument() {
            if (cancelled) return;
            
            setLoading(true)

            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)
                console.log('docSnap: ', docSnap);

                setDocument(docSnap.data())
                setLoading(false)
            } catch (error) {
                console.log('error: ', error);
                setError(error.message)
                setLoading(false)
            }

            
           
        }

        loadDocument();
    }, [cancelled, docCollection, id])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {document, loading, error};
}