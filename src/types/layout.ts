// Layout Component Types
export interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export interface HeaderProps {
  className?: string;
  onMobileMenuToggle?: () => void;
  title: string;
}

export interface SidebarProps {
  onClose?: () => void;
}
