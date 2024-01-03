"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import data from "@/db.json";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { categories } = data;

  const form = useForm({
    defaultValues: {
      category: [] as string[],
      status: "",
      sortBy: "",
    },
  });

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <Form {...form}>
          <form>
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
                            checked={form.watch().category.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentCategories =
                                form.watch().category || [];
                              const updatedCategories = checked
                                ? [...currentCategories, item.id]
                                : currentCategories.filter(
                                    (value: string) => value !== item.id
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
                        {[ "urgent", "tax benefits", "completed"].map(
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
                        {["latest", "published date", "alphabetic order"].map(
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
          
          </form>
        </Form>
      </div>
    </div>
  );
}
