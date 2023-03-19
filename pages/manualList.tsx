import axios from "axios"
import { GetStaticProps } from "next"
import Head from "next/head"
import { FC, useRef, useState } from "react"
import ManualListItem from "../src/components/manualListItem"
import Title from "../src/components/title"

// fetch
export const getStaticProps: GetStaticProps = async (context) => {
	const GOOGLE_DRIVE_API_DEMO =
		"https://script.google.com/macros/s/AKfycbzD5pz5Vd-355SR7-6toSASjiP-uOtxampW-dze_pS3XxHjODGSVYM1cFzoxFj4I15PbA/exec"
	const data = await axios(GOOGLE_DRIVE_API_DEMO, { headers: { "User-Agent": "*" } })

	console.log("STATUS:  ", data.status)
	console.log("Res::::::::::::::::::::::: ", data.data)

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data: data.data },
		revalidate: 60 * 60 * 4, // 4時間ごとにデータフェッチ
	}
}

type Data = {
	createdAt: string // or Date or GoogleAppsScript.Base.Date
	fileName: string
	fileUrl: string
	id: string
	mymeType?: string
	thumbnail?: GoogleAppsScript.Base.Blob // or Blob
	updatedAt: string // or Date or GoogleAppsScript.Base.Date
}

// TODO マニュアルのファイルをgoogle driveに保存しといてリンクを貼る
const ManualList: FC = ({ data }: any) => {
	// debug
	console.log("DATA:::::::::::::\n", data)

	const inputRef = useRef<HTMLInputElement>(null)
	const [searchQuery, setSearchQuery] = useState(data)

	const handleSearch = () => {
		const value = inputRef.current?.value.toLowerCase().trim()
		console.log(value)

		// フィルタリング機能
		if (typeof value === "string") {
			setSearchQuery(data.filter((item: Data) => item.fileName.toLowerCase().trim().includes(value)))
		}
		// debug
		console.log(searchQuery)
		console.log(data.length)
		console.log(searchQuery.length)
	}

	return (
		<>
			<Head>
				<title>マニュアル一覧</title>
			</Head>

			<Title title="マニュアル一覧" />

			<div className="flex items-center justify-center w-full">
				<label htmlFor="search" className="text-xl text-gray-800 ">
					検索 :
				</label>
				<input
					id="search"
					type="text"
					className="justify-end w-1/2 px-4 py-2 my-4 ml-4 text-xl tracking-wide text-gray-800 border border-gray-400 rounded"
					onChange={() => handleSearch()}
					ref={inputRef}
				/>
				<div className="justify-end p-2 ml-4 text-xl text-indigo-500 rounded opacity-90">
					{searchQuery.length} / {data.length}
				</div>
			</div>

			<div className="flex flex-wrap items-start justify-center min-h-screen">
				{searchQuery.map((item: Data) => {
					const { id, createdAt, updatedAt, fileName, fileUrl } = item
					// fileUrlは編集モードになっているので、previewモードに変更する．
					const previewFileUrl = fileUrl.replace("edit", "preview")
					return (
						<ManualListItem
							key={id}
							createdAt={createdAt}
							fileName={fileName}
							fileUrl={previewFileUrl}
							updatedAt={updatedAt}
						/>
					)
				})}
			</div>
		</>
	)
}

export default ManualList
