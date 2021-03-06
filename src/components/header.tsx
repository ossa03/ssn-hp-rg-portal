import { FC } from "react"
import NextImage from "next/image"
import { useRouter } from "next/router"
import NextLink from "next/link"

// icons
import { HiOutlineHome, HiOutlineClock, HiOutlineDocumentText, HiOutlinePlay } from "react-icons/hi"

import Logo from "../../public/logo_shiroishi.jpg"
import HeaderIcon from "./uiItem/headerIcon"

const navMenuList = [
	{ label: "Home", href: "/", Icon: HiOutlineHome, area_label: "home" },
	{ label: "時間外登録", href: "/overtimeForm", Icon: HiOutlineClock, area_label: "overtime" },
	{ label: "マニュアル", href: "/manualList", Icon: HiOutlineDocumentText, area_label: "manual" },
	{ label: "動画ECG", href: "/playlist/ecg", Icon: HiOutlinePlay, area_label: "movie_ecg" },
	{ label: "動画ABL", href: "/playlist/abl", Icon: HiOutlinePlay, area_label: "movie_abl" },
]

const Header: FC = () => {
	const router = useRouter()

	return (
		<>
			{/* 画面サイズmd以上のheader ... */}
			<header className="hidden lg:flex fixed  z-50 h-[80px] w-full justify-between items-center p-4 border-b border-b-gray-200 shadow-b-md bg-white top-0 left-0">
				{/* logo */}
				<div
					className="flex items-center justify-center pr-8 cursor-pointer hover:opacity-80"
					onClick={() => router.push("/")}
				>
					<NextImage src={Logo} alt="logo" width="70px" height="70px" />
					<div className="ml-4 text-2xl font-semibold ">放射線部</div>
				</div>

				{/* navigation */}
				<div className="flex justify-end flex-1 mr-10 space-x-4 ">
					{/* navMenu */}
					{navMenuList.map((nav) => (
						<NextLink href={nav.href} key={nav.label}>
							<a>
								<HeaderIcon Icon={nav.Icon} title={nav.label} />
							</a>
						</NextLink>
					))}
				</div>
			</header>

			{/* ... 画面サイズmd以上のheader */}

			{/* TODO mobile用のnavigationを作成する
							 headerはハンバーガーメニューとlogoにする
							 メニューを押したらDrawerで表示する */}
			<header className=" fixed  z-50 top-0 left-0 h-[80px] flex items-center justify-between w-full p-2 bg-white border-b  lg:hidden border-b-gray-200 shadow-b-md">
				{/* logo */}
				<div
					className="flex text-sm items-start w-[60px] h-60px] justify-center pr-4 cursor-pointer hover:opacity-80"
					onClick={() => router.push("/")}
				>
					<NextImage src={Logo} alt="logo" width="50px" height="50px" />
					{/* <div className="ml-4 text-2xl font-semibold ">放射線部</div> */}
				</div>

				{/* navigation */}
				<div className="flex justify-around flex-1 space-x-1 ">
					{/* navMenu */}
					{navMenuList.map((nav) => (
						<NextLink href={nav.href} key={nav.label}>
							<a>
								<HeaderIcon Icon={nav.Icon} title={nav.label} />
							</a>
						</NextLink>
					))}
				</div>
			</header>
		</>
	)
}

export default Header
