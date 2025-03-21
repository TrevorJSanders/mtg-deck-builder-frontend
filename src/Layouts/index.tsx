import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileLayout from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

export function LayoutAdapter() {
  const { isMobile } = useDeviceDetection();

  if (isMobile === null) {
    return <>Loading...</>;
  }

  return <MobileLayout />;
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
