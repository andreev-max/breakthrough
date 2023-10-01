import Icons from "@/components/Icons";
import toast from "react-hot-toast";

export const showToast = () => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "bottom-0" : "-bottom-96"
        } ease-in-out; relative flex w-full translate-y-0 transform-gpu items-center justify-between rounded bg-base700 px-2 py-2 text-base50 shadow-2xl transition-all duration-1000 hover:translate-y-1 hover:shadow-none`}
        onClick={() => toast.dismiss(t.id)}
      >
        <b>Here is your toast.</b>
        <Icons.XCircle strokeWidth={1} />
      </div>
    ),
    {
      duration: 100000,
    },
  );
};
