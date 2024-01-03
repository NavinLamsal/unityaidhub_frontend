// import { Separator } from "@/registry/new-york/ui/separator"
// import { Separator } from "@radix-ui/react-dropdown-menu"
import { ProfileForm } from "./Profile-form"

export default function SettingsProfilePage() {
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