import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="w-full h-[65vh] flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
