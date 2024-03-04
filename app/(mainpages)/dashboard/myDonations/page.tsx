import { DonationTable } from "@/components/dashboard/DonationTable";
import { getUser } from "@/lib/action/getUserData";
import { getUserDetail } from "@/lib/action/userDetail";
import { User } from "@/lib/types/User";
import { UserDetail } from "@/lib/types/UserDetail";

export default async function DonationsPage() {
  const user:User = await getUser();
  let userDetail: UserDetail | null = null; ;
  if(user){
    const userId = user.id;
    userDetail = await getUserDetail(userId);
  }
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Donations</h3>
          <p className="text-sm text-muted-foreground">
            List of your Donations from Unity Aid Hub.
          </p>
        </div>
        {userDetail ? ( // Wrap conditional rendering in curly braces
        <DonationTable donations={userDetail.donations} />
      ) : (
        <h1>Oops, something went wrong</h1>
      )}
      </div>
    )
  }