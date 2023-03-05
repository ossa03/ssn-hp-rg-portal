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
				<a className="w-full px-4 py-4" target="_blank">
					<div className="items-stretch justify-between p-4 transition-all bg-gray-800 rounded-md text-gray-50 hover:opacity-90">
						<h3 className="w-full mb-4 text-xl">{fileName}</h3>
						<div className="flex justify-start space-x-4 text-xs text-gray-300">
							<h3 className="">作成日: {format(new Date(createdAt), "yyyy/MM/dd HH:mm")}</h3>
							<h3 className="">更新日: {format(new Date(updatedAt), "yyyy/MM/dd HH:mm")}</h3>
						</div>
					</div>
				</a>
			</NextLink>
		</>
	)
}

export default ManualListItem
