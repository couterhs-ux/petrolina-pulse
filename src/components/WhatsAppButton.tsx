import { MessageCircle } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps extends Omit<ButtonProps, "onClick"> {
  phone: string;
  message?: string;
  label?: string;
}

export const WhatsAppButton = ({
  phone,
  message = "Olá! Vim pelo Guia PNZ 👋",
  label = "WhatsApp",
  className,
  size = "sm",
  ...props
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={cn(
        "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 font-semibold gap-2 rounded-full",
        className
      )}
      {...props}
    >
      <MessageCircle className="h-4 w-4 fill-current" />
      {label}
    </Button>
  );
};
