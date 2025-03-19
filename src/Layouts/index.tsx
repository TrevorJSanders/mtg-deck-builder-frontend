import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileLayout from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

export function LayoutAdapter() {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return MobileLayout();
  } else return DesktopLayout();
}
