import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form";
import { Textarea } from '../ui/textarea';
import { UpdateValidation } from '@/lib/Validation/UpdateValidation';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const UpdateForm = () => {
    const form = useForm<z.infer<typeof UpdateValidation>>({
        mode: "onBlur",
        resolver: zodResolver(UpdateValidation)
      })
    
      function onSubmit(values:z.infer<typeof UpdateValidation>) { 
        console.log(values)
        form.reset()
      }

  return (
    <Form {...form }>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
    <FormField
      name="updates"
      control={form.control}
      render={({ field }) => (
        <>
          <FormItem>
            <FormLabel>Updates</FormLabel>
            <FormControl>

          <Textarea
            id="updates"
            placeholder="Write the latest update of benificiary"
           
            {...field}
          />
            </FormControl>
          </FormItem>
          <FormMessage />
        </>
      )}
    />         
    <Button variant="default_outline" type="submit">Send</Button>
    </form>


  </Form>
  )
}

export default UpdateForm
