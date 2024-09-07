import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
};
export function ButtonLoading({
  children,
  isLoading,
  className,
  type = "button",
  onClick,
  disabled,
  style,
}: Props) {
  return (
    <Button
      disabled={isLoading || disabled}
      className={className}
      type={type}
      onClick={onClick}
      style={style}
    >
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
