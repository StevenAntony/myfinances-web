export interface SideBarProps {
  title: string;
  isVisible?: boolean;
  items: string[];
  children?: React.ReactNode;
}