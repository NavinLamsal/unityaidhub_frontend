// import { Separator } from "@/registry/new-york/ui/separator"
// import { Separator } from "@radix-ui/react-dropdown-menu"
import { auth } from "@/auth"
import { ProfileForm } from "./Profile-form"
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await auth();
  if(!session) redirect("api/auth/signin");
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      {/* <Separator /> */}
      <ProfileForm />
    </div>
  )
}