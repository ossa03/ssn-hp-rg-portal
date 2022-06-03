import { FC } from "react"
import { IconType } from "react-icons"
import Tooltip from "./tooltip"

type Props = {
	title: string
	Icon: IconType
	rest?: string
}

const HeaderIcon: FC<Props> = ({ Icon, title, ...rest }) => {
	return (
		<>
			<Tooltip description={title} />
			<div
				className={`flex-col md:flex items-center justify-center px-4 py-2 md:space-x-1 transition-all rounded-full cursor-pointer hover:bg-gray-100 group`}
			>
				<Icon className="w-6 h-6 md:w-6 md:h-6 transition-all group-active:opacity-60 items-center justify-center " />
				<div
					className={` hidden md:block text-xs md:text-xl transition-all group-active:opacity-60 items-center justify-center `}
				>
					{title}
				</div>
			</div>
		</>
	)
}

export default HeaderIcon
