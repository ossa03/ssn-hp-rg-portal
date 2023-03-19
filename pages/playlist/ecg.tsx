// TODO  youtube_apiを使用してマニュアルの再生リストを表示する
import { FC, useRef, useState } from "react"
import Head from "next/head"
import { GetStaticProps } from "next"

import { Item, Snippet } from "../../src/types"
import PlaylistItem from "../../src/components/playlistItem"
import Title from "../../src/components/title"

// fetch
export const getStaticProps: GetStaticProps = async (context) => {
	const MAX_RESULTS = 50 // Max50
	const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`
	// TODO 表示したいプレイリストIDを用意する↓
	const YOUTUBE_PLAYLIST_ID = "PLfABn2oMIjDT1b1C7n-cNp5cj03d9fXMt"

	const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}&part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}`)
	const data = await res.json()
	// debug
	console.log({ data: data.items })

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data },
		revalidate: 60 * 60 * 24, // 24時間ごとにデータフェッチ
	}
}

const Ecg: FC = ({ data }: any) => {
	// debuglog
	console.log(data)
	console.log("data.length:::::", data.items.length)

	const inputRef = useRef<HTMLInputElement>(null)
	const [searchQuery, setSearchQuery] = useState<Item[]>(data.items)

	const handleSearch = () => {
		const value = inputRef.current?.value.toLowerCase().trim()
		console.log(value)

		// フィルタリング機能
		if (typeof value === "string") {
			setSearchQuery(data.items.filter((item: Item) => item.snippet.title.toLowerCase().trim().includes(value)))
		}
		// debug
		console.log({ searchQuery })
	}

	return (
		<>
			<Head>
				<title>心電図動画</title>
			</Head>

			<Title title="心電図動画" />

			{/* 検索窓 */}
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
					{searchQuery.length} / {data.items.length}
				</div>
			</div>

			<div className="flex flex-wrap justify-center min-h-screen">
				{searchQuery.map((item: Item) => {
					const snippet: Snippet = item.snippet
					const { videoId } = snippet.resourceId

					return <PlaylistItem key={videoId} snippet={snippet} />
				})}
			</div>
		</>
	)
}

export default Ecg
