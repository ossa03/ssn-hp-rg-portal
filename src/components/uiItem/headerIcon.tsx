import { FC } from "react"
import { IconType } from "react-icons"

type Props = {
	title: string
	Icon: IconType
}

const HeaderIcon: FC<Props> = ({ Icon, title }) => {
	return (
		<>
			<div className="flex items-center justify-center px-4 py-2 space-x-1 transition-all rounded-full cursor-pointer hover:bg-gray-100 group ">
				<Icon className="w-5 h-5 transition-all group-active:opacity-60 " />
				<div className="text-lg transition-all group-active:opacity-60 ">{title}</div>
			</div>
		</>
	)
}

export default HeaderIcon
