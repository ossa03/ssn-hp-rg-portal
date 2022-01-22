import { FC } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { format } from "date-fns"

import { Snippet } from "../types"

// TODO Drive app apiを有効にして、マニュアルを保存してあるフォルダーにアクセスできるようにする
type Props = {
	// TODO define types
	title: string
	href: string
	imageURL?: string
}

const ManualListItem: FC<Props> = (props) => {
	return (
		<>
			<NextLink href={href}>
				<a className="px-4 py-4" target="_blank">
					<div className="items-stretch justify-between p-4 text-white bg-gray-800 border border-gray-600 rounded w-72 hover:opacity-90 ">
						<h3 className="w-full mb-4">{title}</h3>
					</div>
				</a>
			</NextLink>
		</>
	)
}

export default ManualListItem
