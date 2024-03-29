"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

function PostThread({ userId }: { userId: string }) {

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread:'',
            accountId: userId,
        },

    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {

          await createThread({
            text: values.thread,
            author: userId,
            path: pathname,
        });
        
        router.push("/");
    }

    return (
    <Form {...form}>
      <form 
        className="mt-10 flex flex-col justify-start gap-10" 
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-dark-2">
                Content
              </FormLabel>
              <FormControl className="no-focus">
                <Textarea 
                    rows={15}
                    className="account-form_input no-focus"
                    {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue">
            FitPost
        </Button>
      </form>
    </Form>
    )
}

export default PostThread;