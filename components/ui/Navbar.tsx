import Link from "next/link"
import { useRouter } from "next/router"

export type NavbarProps = {
  routes: {
    path: string
    name: string
  }[]
}

const Navbar = ({ routes }: NavbarProps) => {
  const router = useRouter()

  return (
    <div className="w-full flex flex-row gap-4 justify-center mt-10">
      {routes.map(({ path, name }) => (
        <div
          key={path + name}
          className={router.pathname == path ? "border-b border-gray-900" : ""}
        >
          <Link href={path}>{name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Navbar
