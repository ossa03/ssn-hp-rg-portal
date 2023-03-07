"use client"

import { signIn } from "next-auth/react"
import Title from "./uiItem/title"

const Login = () => {
	return (
		<>
			<Title title="ログイン画面" />
			<div>
				<button onClick={() => signIn()}>サインイン</button>
			</div>
		</>
	)
}

export default Login
