import Icons from "@/components/Icons";

export default function Loading() {
  return (
    <div className="flex w-full grow items-center justify-center text-primary500">
      <Icons.Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
