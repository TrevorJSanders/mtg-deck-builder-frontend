import { useState, useEffect } from "react";

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Primary method: Check screen size - this works in all browsers and is the most reliable
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Additional method: Check user agent without using deprecated properties
    const checkUserAgent = () => {
      const userAgent = navigator.userAgent || "";

      // This regex detects common mobile device identifiers in the user agent string
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return mobileRegex.test(userAgent);
    };

    // Check available memory with proper TypeScript handling
    const checkDeviceMemory = () => {
      // Use type assertion to handle deviceMemory
      const nav = navigator as any;
      if (nav.deviceMemory) {
        // Devices with less than 4GB RAM are typically mobile/limited
        return nav.deviceMemory < 4;
      }
      return null; // Feature not supported
    };

    // Additional method: Check if touch is the primary input mechanism
    const checkTouchSupport = () => {
      // Modern way to detect if touch is the primary input
      if (window.matchMedia) {
        return window.matchMedia("(pointer: coarse)").matches;
      }
      // Fallback check
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    // Combine multiple detection methods for higher accuracy
    const checkDevice = () => {
      // Initialize with screen size check
      checkScreenSize();

      // Look for stronger signals of mobile device
      const memoryCheck = checkDeviceMemory();
      const isTouchPrimary = checkTouchSupport();
      const isUserAgentMobile = checkUserAgent();

      // Use memory as priority if available
      if (memoryCheck !== null) {
        setIsMobile(memoryCheck);
        return;
      }

      // For tablet-sized devices (in the middle range)
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        // Consider it mobile if it's touch-primary or user agent indicates mobile
        setIsMobile(isTouchPrimary || isUserAgentMobile);
      }
    };

    // Initial check
    checkDevice();

    // Add event listener for resize
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return { isMobile };
};
