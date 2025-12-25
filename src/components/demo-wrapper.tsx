import { cn } from "~/lib/uitls";

export function DemoWrapper({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      <h1 className='text-2xl font-bold'>{title}</h1>
      {children}
    </div>
  );
}
