import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { LiaDonateSolid } from "react-icons/lia";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import Donation from "./donation";
import SocialShareList from "./SocialShareList";
import { Posts } from "@/lib/types/Posts";

async function extractNumberAndCurrencyFromString(inputString: string) {
    const numberRegex = /[\d,.]+/;
    const currencyRegex = /[A-Z]+/;

    const numberMatch = inputString.match(numberRegex);
    const currencyMatch = inputString.match(currencyRegex);

    const number = numberMatch ? parseInt(numberMatch[0]) : null;
    const currency = currencyMatch ? currencyMatch[0] : null;

    return { number, currency };
}

const DonateCard = async ({ post, userId }: { post: Posts, userId: number }) => {

    const amount = await extractNumberAndCurrencyFromString(post.goalAmount)

    const collectedamount =
        amount.number !== null &&
            post.currentAmount !== null ?
            Math.min((post.currentAmount / amount.number) * 100, 100) :
            0;

    const maxDonation = post.donations && post.donations.length > 0 ?
        post.donations.reduce((maxDonation, currentDonation) =>
            maxDonation.amount > currentDonation.amount ? maxDonation : currentDonation
        ) :
        null;

    return (
        <Card className="w-full md:max-w-lg border-0 drop-shadow-xl shadow-2xl">
            <CardHeader>
                <h1 className="text-2xl font-semibold leading-none tracking-tight">{amount.currency}&nbsp;{post?.currentAmount == null ? '0' : post?.currentAmount}<span className="text-sm font normal text-darkPrimary/70 "> &nbsp; raised of {post.goalAmount} goal</span></h1>
                <CardDescription className="flex flex-col gap-1">
                    <div className="w-full h-1.5 bg-darkPrimary/30 relative">
                        <div className={`h-1.5 bg-Primary/50 absolute top-0 left-0 w-[${collectedamount}%]]`}></div>
                    </div>
                    <p>{post.donations?.length} donations</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-2 justify-between">
                    <div className="flex flex-1  items-center">
                        <div className="w-1/5">
                            <LiaDonateSolid size={24} />
                        </div>
                        <div className="w-3/5">
                            <div>{post.User.name}</div>
                            <Button variant="link" className="px-0.5 text-black/60">Campaigner</Button>
                        </div>
                    </div>
                    <div className="flex flex-1  items-center">
                        <div className="w-1/5">
                            <LiaDonateSolid size={24} />
                        </div>
                        <div className="w-4/5">
                            <div>{post.User.name}</div>
                            <Button variant="link" className="px-0.5 text-black/60">Beneficiary</Button>
                        </div>
                    </div>

                </div>
                <div className=" grid w-full gap-2">
                    <SocialShareList />

                    <Drawer>
                        <DrawerTrigger><Button variant="default" className="w-full">Donate</Button></DrawerTrigger>
                        <DrawerContent className="p-4 mt-10">
                            <Donation post={post} userId={userId} />
                        </DrawerContent>
                    </Drawer>
                </div>

                {/* top contriutor  */}
                <div className="flex flex-1  items-center">
                    <div className="w-[12%]">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-[88%]">
                        {maxDonation ?(
                            <>
                            <div>{maxDonation.User.name}</div>
                        <div className="font-semibold">{amount.currency}&nbsp;{maxDonation.amount} -<Button variant="link" className="px-0.5 text-black/60">Top contributor</Button></div>
                            </>
                        ):(
                        <div className="text-xs">No donations available -Top Contributor</div>
                        )}
                        
                    </div>
                </div>

                {/* first contibutor  */}
                <div className="flex flex-1  items-center">
                    <div className="w-[12%]">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-[88%]">
                    {post.donations && post.donations.length > 0 ? (
                            <><div>{post.donations[0].User.name}</div>
                                <div className="font-semibold">{amount.currency}&nbsp;{post.donations[0].amount} -<Button variant="link" className="px-0.5 text-black/60">First contributor</Button></div>
                            </>

                        ) : (
                            <div className="text-xs">No donations available -First Contributor</div>
                        )}
                    </div>
                </div>
                {/* latest contriutor  */}
                <div className="flex flex-1  items-center">
                    <div className="w-[12%]">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-[88%]">
                        {post.donations && post.donations.length > 0 ? (
                            <><div>{post.donations[post.donations.length - 1].User.name}</div>
                                <div className="font-semibold">{amount.currency}&nbsp;{post.donations[post.donations.length - 1].amount} -<Button variant="link" className="px-0.5 text-black/60">Latest Contributor</Button></div>
                            </>

                        ) : (
                            <div className="text-xs">No donations available -Latest Contributor</div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 justify-between">
                    <Drawer>
                        <DrawerTrigger><Button variant="outline" className="w-full">See All</Button></DrawerTrigger>
                        <DrawerContent className="p-4 mt-10">
                            All contributors
                        </DrawerContent>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger><Button variant="outline" className="w-full">Top contributors</Button></DrawerTrigger>
                        <DrawerContent className="p-4 mt-10">
                            top contributor
                        </DrawerContent>
                    </Drawer>
                </div>

            </CardContent>
        </Card>
    )
}


export default DonateCard;