import { auth } from "@/auth"
import { ProfileForm } from "./Profile-form"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/action/getUserData";


export default async function SettingsProfilePage() {
  const session = await auth();
  if(!session || !session.user) redirect("api/auth/signin");
  const userdata = await getUser();
   console.log("userdata ",userdata)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      {/* <Separator /> */}
      <ProfileForm  userData={userdata}/>
     
    </div>
  )
}