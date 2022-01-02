import { FC } from "react"
import Header from "./header"

const Layout: FC = ({ children }) => {
	return (
		<>
			<Header />
			<div className="h-[calc(100vh-80px)] bg-blue mx-auto pt-4 container mt-[80px] overflow-hidden">
				<main>{children}</main>
			</div>
		</>
	)
}

export default Layout
