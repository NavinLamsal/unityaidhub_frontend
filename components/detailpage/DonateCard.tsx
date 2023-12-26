import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { LiaDonateSolid } from "react-icons/lia";


const DonateCard = () => {
    return (
        <Card className="w-full md:max-w-lg border-0 drop-shadow-xl shadow-2xl">
            <CardHeader>
                <h1 className="text-2xl font-semibold leading-none tracking-tight">$16,326<span className="text-sm font normal text-darkPrimary/70 "> &nbsp; raised of £15,000 goal</span></h1>
                <CardDescription className="flex flex-col gap-1">
                    <div className="w-full h-1.5 bg-darkPrimary/30 relative">
                        <div className="h-1.5 bg-Primary/50 absolute top-0 left-0 w-[50%]"></div>
                    </div>
                    <p>802 donations</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="grid grid-cols-2 justify-between">
                <div className="flex flex-1  items-center">
                    <div className="w-1/5">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-3/5">
                        <div>Leah Vieri</div>
                        <Button variant="link" className="px-0.5 text-black/60">Campaigner</Button>
                    </div>
                </div>
                <div className="flex flex-1  items-center">
                    <div className="w-1/5">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-4/5">
                        <div>Leah Vieri</div>
                        <Button variant="link" className="px-0.5 text-black/60">Beneficiary</Button>
                    </div>
                </div>
                    
                </div>
                <div className=" grid w-full gap-2">
                    <Button variant="default" className="bg-Primary/80 hover:bg-Primary/50">Share</Button>
                    <Button variant="default">Donate</Button>
                </div>

                {/* top contriutor  */}
                <div className="flex flex-1  items-center">
                    <div className="w-[12%]">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-[88%]">
                        <div>Leah Vieri</div>
                        <div className="font-semibold">$20 -<Button variant="link" className="px-0.5 text-black/60">Top contributor</Button></div>
                    </div>
                </div>

                {/* first contibutor  */}
                <div className="flex flex-1  items-center">
                    <div className="w-[12%]">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-[88%]">
                        <div>Leah Vieri</div>
                        <div className="font-semibold">$20 -<Button variant="link" className="px-0.5 text-black/60">First contributor</Button></div>
                    </div>
                </div>
                {/* latest contriutor  */}
                <div className="flex flex-1  items-center">
                    <div className="w-[12%]">
                        <LiaDonateSolid size={24} />
                    </div>
                    <div className="w-[88%]">
                        <div>Leah Vieri</div>
                        <div className="font-semibold">$20 -<Button variant="link" className="px-0.5 text-black/60">Latest contributor</Button></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 justify-between">
                <Button variant="outline">See All</Button>
                <Button variant="outline">Top contributors</Button>
               
                    
                </div>
                
            </CardContent>
        </Card>
    )
}


export default DonateCard;