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
			<Tooltip description={title}>
				<div
					className={`flex items-center justify-center px-4 py-2 lg:space-x-1 transition-all rounded-full cursor-pointer hover:bg-gray-100 group`}
				>
					<Icon className="w-6 h-6 selection:transition-all group-active:opacity-60 items-center justify-center " />
					<div
						className={` hidden lg:block text-xs lg:text-xl transition-all group-active:opacity-60 items-center justify-center `}
					>
						{title}
					</div>
				</div>
			</Tooltip>
		</>
	)
}

export default HeaderIcon
