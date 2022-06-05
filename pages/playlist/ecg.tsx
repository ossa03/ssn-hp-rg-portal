// TODO  youtube_apiを使用してマニュアルの再生リストを表示する
import { FC } from "react"
import Head from "next/head"
import { GetStaticProps } from "next"

import { Snippet } from "../../src/types"
import PlaylistItem from "../../src/components/playlistItem"

// fetch
export const getStaticProps: GetStaticProps = async (context) => {
	const MAX_RESULTS = 50 // Max50
	const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`
	// TODO 表示したいプレイリストIDを用意する↓
	const YOUTUBE_PLAYLIST_ID = "PLfABn2oMIjDT1b1C7n-cNp5cj03d9fXMt"

	const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}&part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}`)
	const data = await res.json()

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
	return (
		<>
			<Head>
				<title>心電図動画</title>
			</Head>
			<div>心電図動画</div>
			<div className="flex flex-wrap items-start justify-start min-h-screen">
				{data.items.map((item: any) => {
					const snippet: Snippet = item.snippet
					const { videoId } = snippet.resourceId

					return <PlaylistItem key={videoId} snippet={snippet} />
				})}
			</div>
		</>
	)
}

export default Ecg
