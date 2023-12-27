import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"


 const images = [
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
  {
    link: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg',
    id: 1
  },
]



const DonateCard = () => {
  return (
    <Tabs defaultValue="about" className="w-full my-4 shadow-lg drop-shadow-xl shadow-black/30 rounded-b-md ">
      <TabsList className="flex w-full justify-start border-b-2 rounded-none border-Primary/60 overflow-x-auto">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="document">Documents</TabsTrigger>
        <TabsTrigger value="update">Updates</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-center">Story About Benificiary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-justify tracking-wide">Anjuli Mehrotra's love for her husband, Vidhi, knows no bounds. Faced with Vidhi's critical liver condition, Anjuli, alongside their daughter Vidha, is embarking on an extraordinary journey of hope and sacrifice. Vidha, a beacon of compassion, has selflessly chosen to donate her liver to save her father's life.

              This family's resilience is both heartwarming and awe-inspiring, but the road to recovery is paved with financial challenges. Anjuli is reaching out to our community for support as they navigate the expenses associated with Vidhi's liver transplant.

              In the spirit of collective compassion, let's join hands to ease the financial burden on the Mehrotra family. Every contribution to the Mehrotra Liver Transplant Fund is a gesture of hope, helping to ensure Vidhi's second chance at life.

              To contribute and be a part of this life-changing journey, Together, we can make a difference and show the world the strength of community and the power of familial love. Thank you for being a source of light in the Mehrotra family's darkest hour.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="document">
      <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-center">Supporting Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col place-items-center">
              {images  && images?.length > 0 ? 
              <>
              {images.map((images)=>(
                <Image 
                key={images.id}
                src={images.link}
                alt={'images'}
                width={500}
                height={700}
                quality={100}
                className="w-full h-auto"
                />
              ))

              }
              </>:
              <>

              </>
            
            }
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="update">
        helloe from updates
      </TabsContent>
      <TabsContent value="comments">
        helloe from comments
      </TabsContent>
    </Tabs>
  )
}



export default DonateCard;