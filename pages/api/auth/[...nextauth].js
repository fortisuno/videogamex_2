import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "../../../utils/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth'

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Correo", type: "text", placeholder: "correo@ejemplo.com" },
      		password: {  label: "Contraseña", type: "password" }
			},
			async authorize(credentials, req) {
				try {
					const userCredentials = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
					return userCredentials.user

				} catch (error) {
					return null;
				}
			}
		})
	],
	pages: {
		signIn: '/login'
	}
})