import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileLayout from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

export function LayoutAdapter() {
  const { deviceType } = useDeviceDetection();

  return (
    <>
      {deviceType === "mobile" && <MobileLayout />}
      {deviceType === "tablet" && <MobileLayout />}
      {deviceType === "desktop" && <DesktopLayout />}
    </>
  );
  //{orientation === "portrait" ? <PortraitLayout /> : <LandscapeLayout />;}
}
