import { FC } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { format } from "date-fns"

import { Snippet } from "../types"

type Props = {
	snippet: Snippet
}

const PlaylistItem: FC<Props> = (props) => {
	const { title, thumbnails, resourceId, description, publishedAt } = props.snippet
	const { videoId } = resourceId
	const { url, height, width } = thumbnails.high
	const YOUTUBE_PLAY_URL = `https://www.youtube.com/watch/?v=${videoId}`

	return (
		<>
			<NextLink href={YOUTUBE_PLAY_URL}>
				<a className="px-4 py-4" target="_blank">
					<div className="items-stretch justify-between p-4 text-white bg-gray-800 border border-gray-600 rounded w-72 hover:opacity-90 ">
						<h3 className="w-full mb-4">{title}</h3>
						<div className="overflow-hidden rounded">
							<NextImage
								className="rounded"
								src={url}
								height={height}
								width={width}
								layout="responsive"
								objectFit="cover"
							/>
						</div>
						<span className="flex justify-end w-full text-sm">{format(new Date(publishedAt), "yyyy/MM/dd")}</span>
					</div>
				</a>
			</NextLink>
		</>
	)
}

export default PlaylistItem
