import React, { FC } from "react"

type Props = {
	title: string
}

const Title: FC<Props> = ({ title }) => {
	return <div className="justify-center flex-1 p-5 text-3xl tracking-wide text-center text-neutral-900">{title}</div>
}

export default Title
