import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import Link from "next/link";
import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({weight: "300",
subsets:['devanagari']})


export const MobileMenu =({setMenuOpen}:{setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>})=>{

    return(
        <Accordion type="single" collapsible className="w-full text-center ">
            <AccordionItem value="item-1">
                <AccordionTrigger className="w-full border-b-2 border-primary py-2 text-center justify-center font-normal hover:no-underline">Category</AccordionTrigger>
                <AccordionContent className="pb-0">
                <div className={`flex flex-col w-full border-b border-primary/20 divide-y-2 divide-primary/20 gap-2 py-2 ${noto.className}`}>
              {Category.map((item, index) => (
                <Link href={`/${item.href}`} className="flex flex-col gap-2 px-2 py-1 rounded-sm hover:bg-primary hover:text-white" key={index} 
                onClick={() => {
                  setMenuOpen(false);
                }}
                >
                  <div className="font-light text-lg ">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}