import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useFunctions } from "../hooks/useFunctions";
import { auth } from "../utils/firebase-client";

export const AuthContext = createContext();

function AuthProvider({ children }) {
	const [usuario, setUsuario] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const { getUsuarioDetalle } = useFunctions();

	const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);

	const signout = () => signOut(auth);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setLoading(true);
			if (!!currentUser) {
				try {
					const idTokenResult = await auth.currentUser.getIdTokenResult();
					const usuarioDetalle = await getUsuarioDetalle({ id: currentUser.uid });
					setUsuario(usuarioDetalle);
					setIsAdmin(idTokenResult.claims["admin"]);
				} catch (error) {
					throw new Error(error);
				}
			} else {
				setUsuario(null);
				setIsAdmin(false);
			}

			setTimeout(() => {
				setLoading(false);
			}, 500);
		});
		return () => unsubscribe();
	}, []);

	const session = { usuario, loading, isAdmin, signin, signout };

	return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export default AuthProvider;
