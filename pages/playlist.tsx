// TODO  youtube_apiを使用してマニュアルの再生リストを表示する
import { FC } from "react"
import { GetStaticProps } from "next"

import { Snippet } from "../src/types"
import PlaylistItem from "../src/components/playlistItem"

// fetch
export const getStaticProps: GetStaticProps = async (context) => {
	const MAX_RESULTS = 5
	const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`
	// TODO 表示したいプレイリストIDを用意する↓
	const YOUTUBE_PLAYLIST_ID = "PLdUwL9O_dBokaW-aavCp3ppd6ynTs-gd2"

	const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}&part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}`)
	const data = await res.json()

	console.log(data.items)
	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data },
	}
}

const Playlist: FC = ({ data }: any) => {
	// debuglog
	console.log(data)
	return (
		<>
			<div>マニュアルプレイリスト(youtube)</div>
			<div className="flex flex-wrap justify-around h-screen space-x-10">
				{data.items.map((item: any) => {
					const snippet: Snippet = item.snippet
					const { videoId } = snippet.resourceId

					return <PlaylistItem key={videoId} snippet={snippet} />
				})}
			</div>
		</>
	)
}

export default Playlist
