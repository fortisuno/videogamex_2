import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-client";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
	const [usuario, setUsuario] = useState({
		data: null,
		loading: true,
		error: null,
		isAdmin: false
	});

	const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);

	const signout = () => signOut(auth);

	useEffect(() => {
		console.log("Autenticando...");
		setUsuario({
			data: null,
			loading: true,
			error: null,
			isAdmin: false
		});
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!!currentUser) {
				auth.currentUser
					.getIdTokenResult()
					.then((idTokenResult) => {
						axios
							.get(process.env.REACT_APP_API_URL + "/usuarios/" + currentUser.uid)
							.then(({ data }) => {
								setUsuario({
									data,
									loading: false,
									error: null,
									isAdmin: idTokenResult.claims["admin"]
								});
								console.log("Sesion establecida...");
							});
					})
					.catch((error) => {
						setUsuario({ data: null, loading: false, error, isAdmin: false });
					});
			} else {
				setUsuario({ data: null, loading: false, error: null, isAdmin: false });
				console.log("No hay sesión activa...");
			}
		});
		return () => unsubscribe();
	}, []);

	const session = { usuario, signin, signout };

	return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export default AuthProvider;
