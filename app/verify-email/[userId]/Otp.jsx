"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Container from "@/components/Container";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  verifyToken: z.string().min(6, {
    message: "Your verification code must be 6 digits long",
  }),
});

export default function OTPForm({ userId }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const code = form.watch("verifyToken");
  useEffect(() => {
    if (code?.length === 6) {
      async function onSubmit(data) {
        try {
          const res = fetch(`/api/verify-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              verifyToken: data,
            }),
          });

          if (res.ok) {
            setLoading(false);
            router.push("/signIn");
          }
        } catch (e) {
          console.log(e);
        }
      }
      onSubmit(code);
    }
  }, [code]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Container>
        <div className="w-[400px] mx-auto h-full flex flex-col items-center justify-center">
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="verifyToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>verification code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the verification code sent to your email
                      address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </Container>
    </div>
  );
}
