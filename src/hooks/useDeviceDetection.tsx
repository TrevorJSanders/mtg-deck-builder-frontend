import { useState, useEffect, useCallback } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

interface DeviceDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  orientation: "portrait" | "landscape";
}

export const useDeviceDetection = (): DeviceDetectionResult => {
  // Initialize with more detailed state
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: "desktop",
    orientation: "landscape",
  });

  // Define breakpoints for different device types
  const MOBILE_MAX_WIDTH = 767;
  const TABLET_MIN_WIDTH = 768;
  const TABLET_MAX_WIDTH = 1023;
  const DESKTOP_MIN_WIDTH = 1024;

  // Create a memoized detection function to avoid recreating on each render
  const detectDevice = useCallback(() => {
    // 1. Screen dimensions check
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation: "portrait" | "landscape" =
      height > width ? "portrait" : "landscape";

    // 2. User agent detection with expanded patterns
    const userAgent = navigator.userAgent || "";

    // More comprehensive regex that catches additional mobile devices
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Touch|Mobi|Symbian|Windows Phone|Samsung|LG|Sony|Xiaomi|OPPO|Vivo|Nokia/i;

    // More specific tablet detection
    const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet|Silk|Kindle|PlayBook/i;

    const userAgentIsMobile = mobileRegex.test(userAgent);
    const userAgentIsTablet = tabletRegex.test(userAgent);

    // 3. Touch capability detection
    const hasTouchSupport =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

    // 4. Device memory check (with proper typing)
    let hasLimitedMemory = false;
    if ("deviceMemory" in navigator) {
      // Using explicit type assertion for deviceMemory
      const memory = (navigator as any).deviceMemory;
      hasLimitedMemory = typeof memory === "number" && memory < 4;
    }

    // 5. Connection type check for mobile networks
    let isOnMobileNetwork = false;
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.type) {
        isOnMobileNetwork = ["cellular", "2g", "3g", "4g", "5g"].includes(
          connection.type
        );
      }
    }

    // 6. Battery status can indicate mobile device
    let hasBatteryAPI = false;
    if ("getBattery" in navigator) {
      hasBatteryAPI = true;
      // We're not awaiting the battery promise here to keep the function synchronous
      // But this is a signal that it's likely a mobile device or laptop
    }

    // 7. Hardware concurrency (CPU cores)
    const hasLimitedCPU =
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;

    // Multi-signal determination with weighted analysis
    let isMobileSignals = 0;
    let isTabletSignals = 0;
    let isDesktopSignals = 0;

    // Width-based signals (strongest indicator)
    if (width <= MOBILE_MAX_WIDTH) {
      isMobileSignals += 3;
    } else if (width >= TABLET_MIN_WIDTH && width <= TABLET_MAX_WIDTH) {
      isTabletSignals += 3;
    } else if (width >= DESKTOP_MIN_WIDTH) {
      isDesktopSignals += 3;
    }

    // User agent signals
    if (userAgentIsMobile && !userAgentIsTablet) {
      isMobileSignals += 2;
    } else if (userAgentIsTablet) {
      isTabletSignals += 2;
    } else {
      isDesktopSignals += 1;
    }

    // Touch signals
    if (hasTouchSupport) {
      // Touch doesn't necessarily mean mobile, but increases likelihood
      isMobileSignals += 1;
      isTabletSignals += 1;
    } else {
      isDesktopSignals += 2;
    }

    // Limited resources signals
    if (hasLimitedMemory) {
      isMobileSignals += 1;
      isTabletSignals += 0.5;
    }

    if (hasLimitedCPU) {
      isMobileSignals += 1;
      isTabletSignals += 0.5;
    }

    // Connection type signals
    if (isOnMobileNetwork) {
      isMobileSignals += 2;
    }

    // Determine device type based on weighted signals
    let deviceType: DeviceType;
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;

    // Factor in orientation for tablets
    if (
      orientation === "portrait" &&
      width >= TABLET_MIN_WIDTH &&
      width <= TABLET_MAX_WIDTH
    ) {
      isTabletSignals += 1;
    }

    // Special case for iPads and high-end tablets that might report desktop-like characteristics
    if (
      userAgentIsTablet ||
      (width >= TABLET_MIN_WIDTH &&
        width <= TABLET_MAX_WIDTH &&
        hasTouchSupport)
    ) {
      isTabletSignals += 1;
    }

    // Make final determination
    if (
      isMobileSignals > isTabletSignals &&
      isMobileSignals > isDesktopSignals
    ) {
      deviceType = "mobile";
      isMobile = true;
    } else if (
      isTabletSignals >= isMobileSignals &&
      isTabletSignals > isDesktopSignals
    ) {
      deviceType = "tablet";
      isTablet = true;
      // Consider tablets as mobile for UI purposes if requested
      isMobile = true;
    } else {
      deviceType = "desktop";
      isDesktop = true;
    }

    // Handle edge cases: small laptops with touch screens
    if (hasTouchSupport && width >= DESKTOP_MIN_WIDTH && hasBatteryAPI) {
      // Might be a touchscreen laptop
      isDesktop = true;
      isTablet = false;
      isMobile = false;
      deviceType = "desktop";
    }

    // Update state with all information
    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      deviceType,
      orientation,
    });
  }, []);

  useEffect(() => {
    // Initial detection
    detectDevice();

    // Event listeners for changes
    window.addEventListener("resize", detectDevice);

    // Optional: detect orientation changes explicitly for iOS/Safari
    window.addEventListener("orientationchange", detectDevice);

    // Track network changes if available
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.addEventListener) {
        connection.addEventListener("change", detectDevice);
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("orientationchange", detectDevice);

      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.removeEventListener) {
          connection.removeEventListener("change", detectDevice);
        }
      }
    };
  }, [detectDevice]);

  return deviceInfo;
};
