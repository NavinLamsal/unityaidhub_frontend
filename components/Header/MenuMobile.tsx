import React from "react";
import Link from "next/link";

interface MenuType{
    id: number,
    name:string,
    url: string,
    subMenu?: any[] 
}

const data:MenuType[] = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Browse a Campaign", url: "/browse-a-campaign" },
    { id: 2, name: "Start a campaigning", url: "/start-a-campaigning"},
  ];



const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu,categories }:any) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black z-20">
      {data.map((items) => {
        return (
          <React.Fragment key={items.id}>
            {!!items?.subMenu ? (
              <li
                className="cursor-pointer flex flex-col px-5 py-4 border-b relative "
                onClick={()=>setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {items.name}
                </div>
                {showCatMenu && (
                  <ul className="bg-smokeWhite -mx-5 mt-4 -mb-4">
                    {categories.map(({attributes:c,id}:any) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {c.name}
                            <span className="opacity-50 text-sm">
                            {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <Link href={items?.url} onClick={() => setMobileMenu(false)}>
                  {items.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;