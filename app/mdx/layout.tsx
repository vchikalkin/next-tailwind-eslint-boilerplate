import type { PropsWithChildren } from 'react';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="prose prose-neutral md:prose-lg dark:prose-invert max-w-none">{children}</div>
  );
}
