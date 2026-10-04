'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LoginFormValues, loginSchema } from '@/lib/validations/auth';
import { UserRole } from '@/models/user';

export interface DemoAccount {
  label: string;
  email: string;
  password: string;
  role: UserRole;
}

interface LoginFormProps {
  role: UserRole;
  callbackUrl?: string;
  demoAccounts?: DemoAccount[];
}

export function LoginForm({ role, callbackUrl, demoAccounts }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const emailFromQuery = searchParams.get('email') || '';
  const t = useTranslations('Auth');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromQuery,
      password: '',
      role: role,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        role: data.role,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // Redirect to unified dashboard
      router.push(callbackUrl || '/dashboard');

      toast.success(t('loginSuccess'));
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('loginError'));
    } finally {
      setIsLoading(false);
    }
  }

  function fillDemoCredentials(demo: DemoAccount) {
    form.setValue('email', demo.email, { shouldValidate: true });
    form.setValue('password', demo.password, { shouldValidate: true });
    form.setValue('role', demo.role);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t('loggingIn') : t('login')}
        </Button>

        {demoAccounts && demoAccounts.length > 0 && (
          <>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('demoAccounts') || 'Demo Accounts'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {demoAccounts.map((demo) => (
                <Button
                  key={demo.email}
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2.5"
                  onClick={() => fillDemoCredentials(demo)}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{demo.label}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {demo.email}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
