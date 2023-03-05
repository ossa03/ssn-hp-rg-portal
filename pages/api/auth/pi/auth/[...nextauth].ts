import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextApiRequest, NextApiResponse } from "next"

interface Credentials {
	client_id: string
	client_secret: string
}

interface CredentialsMap {
	[provider: string]: Credentials
}

const credentials: CredentialsMap = {
	google: {
		client_id: process.env.GOOGLE_CLIENT_ID!,
		client_secret: process.env.GOOGLE_CLIENT_SECRET!,
	},
}

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: credentials.google.client_id,
			clientSecret: credentials.google.client_secret,
		}),
	],
})
