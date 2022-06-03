import { FC } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { format } from "date-fns"

// TODO google drive apiを有効にして、マニュアルを保存してあるフォルダーにアクセスできるようにする

type Props = {
	createdAt: string // or Date or GoogleAppsScript.Base.Date
	fileName: string
	fileUrl: string
	thumbnail?: GoogleAppsScript.Base.Blob // or Blob
	updatedAt: string // or Date or GoogleAppsScript.Base.Date
}

const ManualListItem: FC<Props> = ({ fileName = "マニュアルタイトル", fileUrl = "#", createdAt, updatedAt }) => {
	return (
		<>
			<NextLink href={fileUrl}>
				<a className="px-4 py-4 w-full" target="_blank">
					<div className="items-stretch justify-between p-4 text-white bg-gray-800 border border-gray-600 rounded hover:opacity-90 ">
						<h3 className="w-full mb-4">タイトル: {fileName}</h3>
						<h3 className="w-full mb-4">作成日: {format(new Date(createdAt), "yyyy/MM/dd HH:mm")}</h3>
						<h3 className="w-full mb-4">更新日: {format(new Date(updatedAt), "yyyy/MM/dd HH:mm")}</h3>
						{/* <h3 className="w-full mb-4">fileUrl: {URL.createObjectURL(thumbnail)}</h3> */}
					</div>
				</a>
			</NextLink>
		</>
	)
}

export default ManualListItem
