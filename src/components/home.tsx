import { DefaultSession } from "next-auth"
import { signOut } from "next-auth/react"
import NextImage from "next/image"
import React, { FC } from "react"
import Title from "./uiItem/title"

const Home = ({ user }: { user: DefaultSession["user"] }) => {
	return (
		<>
			<Title title="ホーム画面" />
			<div className="flex p-10 border rounded">
				{/* <NextImage src={user?.image} alt={"ユーザーアイコン"} layout="fill" objectFit="cover" className="rounded" /> */}
				{/* {user?.image && <NextImage src={user.image} alt={"ユーザーアイコン"} layout="fill" className="rounded" />} */}
				<div className="flex-col">
					<p>ユーザー名 : {user?.name}</p>
					<p>メール : {user?.email}</p>
				</div>
			</div>
			<div className="flex p-2 mt-3 bg-blue-600 rounded text-stone-100 hover:bg-blue-500 hover:cursor-pointer">
				<button className="justify-center mx-auto" onClick={() => signOut()}>
					サインアウト
				</button>
			</div>
		</>
	)
}

export default Home
