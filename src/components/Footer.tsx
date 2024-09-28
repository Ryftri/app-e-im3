import Link from "next/link";

export function FooterComponent () {
    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Aplikasi <Link href={"/"} className="hover:underline">E-iM3</Link></span>
            </div>
        </footer>
    )
}