// TODO  youtube_apiを使用してマニュアルの再生リストを表示する
import { FC } from "react"
import Head from "next/head"
import { GetStaticProps } from "next"

import { Snippet } from "../../src/types"
import PlaylistItem from "../../src/components/playlistItem"

// fetch
export const getStaticProps: GetStaticProps = async (context) => {
	const MAX_RESULTS = 10 // Max50
	const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`
	// TODO 表示したいプレイリストIDを用意する↓
	const YOUTUBE_PLAYLIST_ID = "PLfABn2oMIjDQsaZuQVAvI2EwUsIMvd2nN"

	const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}&part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}`)
	const data = await res.json()

	// debug
	console.log(data.items)

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data },
		revalidate: 60 * 60 * 60 * 24, // 24時間ごとにデータフェッチ
	}
}

const Abl: FC = ({ data }: any) => {
	// debuglog
	console.log(data)
	return (
		<>
			<Head>
				<title>アブレーション動画</title>
			</Head>
			<div>アブレーション動画</div>
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

export default Abl
