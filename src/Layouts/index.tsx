import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileLayout from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

export function LayoutAdapter() {
  const { isMobile } = useDeviceDetection();
  const reallyThough = true || isMobile;

  if (reallyThough) {
    return MobileLayout();
  } else return DesktopLayout();
}
