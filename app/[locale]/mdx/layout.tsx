import type { PropsWithChildren } from 'react';

export default function MdxLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="prose max-w-none prose-neutral md:prose-lg dark:prose-invert">
        {children}
      </div>
    </div>
  );
}
