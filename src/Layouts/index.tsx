import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileLayout from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

export function LayoutAdapter() {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return MobileLayout();
  } else if (isMobile === false) {
    return DesktopLayout();
  } else {
    return <>Loading...</>;
  }
}
