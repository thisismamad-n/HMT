"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "@/components/DarkModeToggle"
import {
  LayoutDashboard,
  Settings,
  UserPlus,
  Users,
  CreditCard,
  LineChart,
  Building2,
  FileText,
  Mail,
  MessageSquare,
  PlusCircle,
  Calendar,
  FolderKanban,
  Receipt,
  Boxes,
  Target,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export default function Sidebar({ className, onCollapseChange }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCollapseToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  return (
    <div 
      className={cn(
        "relative h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[60px]" : "w-[var(--sidebar-width)]",
        className
      )}
      style={{ 
        zIndex: 50,
        backgroundColor: '#0A0F1A', // Darker background color for sidebar
      }}
    >
      <div className="flex h-full flex-col border-r border-gray-800 relative z-10">
        <Button
          variant="secondary"
          size="icon"
          className="absolute -right-4 top-6 z-50 h-8 w-8 rounded-full border bg-white shadow-md"
          onClick={handleCollapseToggle}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-primary" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-primary" />
          )}
        </Button>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h2 className="mb-2 px-4 text-lg font-semibold text-white">
                  مدیریت کسب و کار
                </h2>
              )}
              <div className="space-y-1">
                <Link href="/dashboard">
                  <Button
                    variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/dashboard" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <LayoutDashboard className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "داشبورد"}
                  </Button>
                </Link>
                <Link href="/customers">
                  <Button
                    variant={pathname === "/customers" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/customers" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Users className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "مشتریان"}
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button
                    variant={pathname === "/orders" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/orders" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Receipt className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "سفارش‌ها"}
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    variant={pathname === "/products" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/products" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Boxes className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "محصولات"}
                  </Button>
                </Link>
                <Link href="/sales">
                  <Button
                    variant={pathname === "/sales" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/sales" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <LineChart className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "گزارش فروش"}
                  </Button>
                </Link>
                <Link href="/goals">
                  <Button
                    variant={pathname === "/goals" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/goals" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Target className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "اهداف کسب و کار"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h2 className="mb-2 px-4 text-lg font-semibold text-white">
                  ارتباطات
                </h2>
              )}
              <div className="space-y-1">
                <Link href="/team">
                  <Button
                    variant={pathname === "/team" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/team" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <UserPlus className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "مدیریت تیم"}
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button
                    variant={pathname === "/messages" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/messages" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <MessageSquare className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "پیام‌ها"}
                  </Button>
                </Link>
                <Link href="/mail">
                  <Button
                    variant={pathname === "/mail" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/mail" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Mail className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "ایمیل‌ها"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h2 className="mb-2 px-4 text-lg font-semibold text-white">
                  مالی
                </h2>
              )}
              <div className="space-y-1">
                <Link href="/billing">
                  <Button
                    variant={pathname === "/billing" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/billing" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <CreditCard className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "صورتحساب‌ها"}
                  </Button>
                </Link>
                <Link href="/transactions">
                  <Button
                    variant={pathname === "/transactions" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/transactions" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Wallet className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "تراکنش‌ها"}
                  </Button>
                </Link>
                <Link href="/documents">
                  <Button
                    variant={pathname === "/documents" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/documents" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <FileText className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "اسناد مالی"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h2 className="mb-2 px-4 text-lg font-semibold text-white">
                  تنظیمات
                </h2>
              )}
              <div className="space-y-1">
                <Link href="/settings">
                  <Button
                    variant={pathname === "/settings" ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full text-white hover:bg-gray-800",
                      pathname === "/settings" ? "bg-gray-800" : "bg-transparent",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Settings className={cn("h-4 w-4", isCollapsed ? "" : "ml-2")} />
                    {!isCollapsed && "تنظیمات حساب"}
                  </Button>
                </Link>
                
                {/* Dark Mode Toggle */}
                <div className={cn(
                  "mt-6 border-t pt-4",
                  isCollapsed ? "" : "mx-1"
                )}>
                  {!isCollapsed && (
                    <div className="mb-2 px-2">
                      <h3 className="text-sm font-medium">تغییر حالت نمایش</h3>
                    </div>
                  )}
                  <div className={cn(
                    isCollapsed ? "flex justify-center" : "px-1"
                  )}>
                    <DarkModeToggle 
                      minimal={isCollapsed} 
                      className={isCollapsed ? "" : "w-full"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 