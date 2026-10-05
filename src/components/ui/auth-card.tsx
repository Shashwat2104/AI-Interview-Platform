import Image from 'next/image';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthCardProps extends React.ComponentProps<typeof Card> {
  /** Retained for API compatibility; auth surfaces share one brand style. */
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'indigo' | 'default';
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

function AuthCardBase({
  children,
  title,
  description,
  footer,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  colorScheme,
  ...props
}: AuthCardProps) {
  return (
    <Card data-color-scheme={colorScheme} className={cn('w-full shadow-sm', className)} {...props}>
      <CardHeader
        className={cn('items-center justify-items-center pb-2 text-center', headerClassName)}
      >
        <Image
          src="/images/hirelytics-logo.svg"
          alt="Hirelytics"
          width={48}
          height={48}
          className="mb-2 h-12 w-12 dark:invert-[0.15] dark:brightness-110"
        />
        <CardTitle className="font-display text-xl font-medium tracking-tight">{title}</CardTitle>
        {description && (
          <CardDescription className="max-w-xs text-balance">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
      {footer && (
        <CardFooter className={cn('flex flex-col space-y-3', footerClassName)}>{footer}</CardFooter>
      )}
    </Card>
  );
}

export function AuthCard(props: AuthCardProps) {
  return <AuthCardBase {...props} />;
}

/** Legacy alias — all auth surfaces now render the same clean card. */
export function AnimatedAuthCard(props: AuthCardProps) {
  return <AuthCardBase {...props} />;
}
