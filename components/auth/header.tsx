import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface HeaderProps {
  label: string;
  title: string;
}

export default function Header({ title, label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-bold text-center", font.className)}>
        {title}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
