import axios from "axios"
import { GetStaticProps } from "next"
import Head from "next/head"
import { FC, useRef, useState } from "react"
import ManualListItem from "../src/components/manualListItem"

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

	const ref = useRef<HTMLInputElement>(null)
	const [searchQuery, setSearchQuery] = useState(data)

	const handleSearch = () => {
		// if (ref.current === undefined) {
		// 	setSearchQuery(data)
		// }
		const value = ref.current?.value
		console.log(value)

		// フィルタリング機能
		if (typeof value === "string") {
			setSearchQuery(data.filter((item: Data) => item.fileName.toLowerCase().includes(value)))
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

			<div>マニュアル一覧</div>

			<div className="flex justify-center w-full items-center">
				<label htmlFor="search" className="  text-gray-800 text-xl ">
					検索:
				</label>
				<input
					id="search"
					type="text"
					className="text-gray-800 text-xl px-4 py-2 tracking-wide border border-gray-400 justify-end rounded w-1/2 ml-4 my-4"
					onChange={() => handleSearch()}
					ref={ref}
				/>
				<div className="text-indigo-500 opacity-90 text-xl ml-4 p-2 rounded justify-end">
					{searchQuery.length} / {data.length}
				</div>
			</div>

			<div className="flex flex-wrap items-start justify-start min-h-screen">
				{searchQuery.map((item: Data) => {
					const { id, createdAt, updatedAt, fileName, fileUrl } = item

					return (
						<ManualListItem
							key={id}
							createdAt={createdAt}
							fileName={fileName}
							fileUrl={fileUrl}
							updatedAt={updatedAt}
						/>
					)
				})}
			</div>
		</>
	)
}

export default ManualList
