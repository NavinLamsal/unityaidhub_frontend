"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import data from "@/db.json";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/types/Category";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categoriesList: Category[];
}

interface FilterInputs{
  category?: string[];
  status?: string,
  sortBy?: string,
}

export function Sidebar({ className, categoriesList }: SidebarProps) {
  const categories = categoriesList?? [] as Category[];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const categoryString = searchParams.get('category');
  const categoryArray = categoryString ? categoryString.split(',') : [] as string[];

  const form = useForm({
    defaultValues: {
      category: categoryArray,
      status: searchParams.get('status')?.toString(),
      sortBy: searchParams.get('sortBy')?.toString(),
    },
  });

  console.log("category",searchParams.get('category'));

  async function onSubmit(values: FilterInputs) {
    const { category, status, sortBy } = values;
    const queryParams = new URLSearchParams(searchParams);
  
    if (category && category.length > 0) {
      queryParams.set('category', category.join(','));
    }
  
    if (status) {
      queryParams.set('status', status);
    }
  
    if (sortBy) {
      queryParams.set('sortBy', sortBy);
    }
    replace(`${pathname}?${queryParams.toString()}`);
  }


  function resetFilter(): void {
    form.reset({
      category: [],
      status: '',
      sortBy: '',
    });
  
    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete('category');
    queryParams.delete('status');
    queryParams.delete('sortBy');
  
    replace(pathname);
  }

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Category Section */}
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Category
                  </h2>
                  <div className="space-y-1">
                    {categories.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start pl-5 space-x-3 space-y-1"
                      >
                        <FormControl>
                          <Checkbox
                            checked={form.watch().category.includes(item.id.toString())}
                            onCheckedChange={(checked) => {
                              const currentCategories =
                                form.watch().category || [];
                              const updatedCategories = checked
                                ? [...currentCategories, item.id.toString()]
                                : currentCategories.filter(
                                    (value: string) => value !== item.id.toString()
                                  );
                              form.setValue("category", updatedCategories);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.name}
                        
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                </div>
              )}
            />

            {/* Status Section */}
            <div className="px-3 py-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                      Status
                    </h2>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[ "BASIC", "URGENT"].map(
                          (status) => (
                            <FormItem
                              key={status}
                              className="flex flex-row items-start  pl-5 space-x-3 space-y-1"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={status}
                                  checked={form.watch().status === status}
                                  onChange={() => {
                                    form.setValue("status", status);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {status}
                              </FormLabel>
                            </FormItem>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Sort by Section */}
            <div className="px-3 py-2">
              <FormField
                control={form.control}
                name="sortBy"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                      Sort by
                    </h2>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {["latest", "published date"].map(
                          (sortBy) => (
                            <FormItem
                              key={sortBy}
                              className="flex flex-row items-start pl-5 space-x-3 space-y-1"
                            >
                              <FormControl>
                                <RadioGroupItem
                                value={sortBy}
                                checked={form.watch().sortBy === sortBy}
                                onChange={() => {
                                  form.setValue("sortBy", sortBy);
                                }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                              {sortBy}
                              </FormLabel>
                            </FormItem>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-1 flex-row justify-start px-6 py-2">
            <Button type="reset" onClick={()=>resetFilter()} variant={"default_outline"}>Clear</Button>
            <Button type="submit">Apply</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
