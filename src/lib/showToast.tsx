import Icons from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { ReactNode } from "react";
import toast from "react-hot-toast";

const toastType = {
  error: "error",
  success: "success",
} as const;

type ToastType = (typeof toastType)[keyof typeof toastType];

export const showToast = (
  message: string | ReactNode,
  type: ToastType = "success",
) => {
  if (type === toastType.error) {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "bottom-0" : "-bottom-96"
          } ease-in-out; relative flex w-full translate-y-0 transform-gpu items-center justify-between gap-2 rounded bg-error400 p-1 text-base50 shadow-2xl transition-all duration-1000 hover:translate-y-1 hover:shadow-none`}
          onClick={() => toast.dismiss(t.id)}
        >
          <p className="grow">{message}</p>
          <Button variant="ghost" size="sm">
            <Icons.XCircle strokeWidth={1} />
          </Button>
        </div>
      ),
      {
        duration: 100000,
      },
    );
  }

  if (type === toastType.success) {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "bottom-0" : "-bottom-96"
          } ease-in-out; relative flex w-full translate-y-0 transform-gpu items-center justify-between rounded bg-base700 p-1 text-base50 shadow-2xl transition-all duration-1000 hover:translate-y-1 hover:shadow-none`}
          onClick={() => toast.dismiss(t.id)}
        >
          <p className="line-clamp-2 block grow text-ellipsis">{message}</p>
          <Button variant="ghost" size="sm">
            <Icons.XCircle className="min-w-[24]" strokeWidth={1} />
          </Button>
        </div>
      ),
      {
        duration: 100000,
      },
    );
  }
};
