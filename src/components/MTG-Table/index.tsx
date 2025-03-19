//import { TableDesktop } from "./TableDesktop";
import { TableMobile } from "./TableMobile";
//import { useDeviceDetection } from "@/hooks/useDeviceDetection";

//const { isMobile } = useDeviceDetection();

interface MTGTableProps {
  type: string;
  rows: string;
}

export function MTGTableAdapter({ type, rows }: MTGTableProps) {
  if (type && rows) {
  }
  //if (isMobile) {
  return TableMobile({ type, rows });
  //} else {
  //  return TableDesktop({ type, rows });
  //}
}
