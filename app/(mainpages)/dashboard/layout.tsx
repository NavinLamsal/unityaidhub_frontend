import { Metadata } from "next"
import Image from "next/image"

// import { Separator } from "@/registry/new-york/ui/separator"
import { SidebarNav } from "@/components/dashboard/side-nav"
import { getUserDetail } from "@/lib/action/userDetail"
import { getUser } from "@/lib/action/getUserData"
import { User } from "@/lib/types/User"
// import { SidebarNav } from "@/app/examples/forms/components/sidebar-nav"

export const metadata: Metadata = {
  title: "Dashboard | Unity Aid Hub",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard",
  },
  {
    title: "My Campaign",
    href: "/dashboard/myPosts",
  },
  {
    title: "My Donations",
    href: "/dashboard/myDonations",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {

  return (
    <>
      <div className=" space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your account campaign and view your Donations.
          </p>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </>
  )
}