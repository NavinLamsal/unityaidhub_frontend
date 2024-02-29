import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import Image from 'next/image'
import { comments } from "@/db.json";
import { extractInitials } from "@/lib/reuseableFunctions/Extractinitals";
import UpdateForm from '../Form/UpdateForm';


const Update = () => {
    return (
        <div className='grid gap-2'>
            <Card>
                <CardHeader> Give Updates</CardHeader>
                <CardContent>
                    <UpdateForm/>
                </CardContent>
            </Card>
            {comments.map((comment) => (
                <Card key={comment.id}>
                    <CardHeader>
                        <div className='flex flex-1 gap-4'> 
                            {comment.creator_profile ? (
                                <Image
                                    src={comment.creator_profile}
                                    alt="profile-image"
                                    width={400}
                                    height={400}
                                    quality={75}
                                    className="h-16 w-16 lg:h-16 lg:w-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-16 w-16 lg:h-16 lg:w-16 text-xl rounded-full object-cover bg-Primary/20 flex justify-center items-center">
                                    {extractInitials(comment.creator_name)}
                                </div>
                            )}
                            <div>
                                <h3 className='text-lg font-semibold'>{comment.creator_name}</h3>
                                <p className='text-sm font-light'>about 20 hours ago</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        Dear Supporters,

                        I hope you all are doing well.

                        To begin with, I would like to thank all our donors and supporters who have come forward to help Bhaskar.

                        NOTE: To help raise the remaining amount faster, Milaap will now offer 10% matching on all donations (until the funds last )**, For example, for a 1000 INR donor&apos;s contribution, Milaap will now contribute an additional Rs. 100 or (equivalent in USD) to the campaign thereby creating a 1.1X impact.

                        Also, the fundraiser campaign now has 80G Tax Exemption Benefits for the donors who have so far contributed as well as for all the future donors who&apos;d contribute towards the fundraising campaign cause.

                        https://milaap.org/fundraisers/support-bhaskar-baruah-1

                        Please continue to share, support, and contribute. Thank you.

                        Regards,
                        Prabhakar Jayakumar
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Update
