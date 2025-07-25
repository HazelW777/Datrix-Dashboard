"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  History,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAnalysis } from "@/contexts/analysis-context";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { history } = useAnalysis();

  const navigation = [
    {
      name: "New Analysis",
      href: "/upload",
      icon: Plus,
      current: pathname === "/upload",
    },
    {
      name: "History",
      href: "/history",
      icon: History,
      current: pathname === "/history",
      badge: history.length,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-slate-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!isCollapsed && (
          <Link href="/upload" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">Datrix</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col">
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={item.current ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-3",
                    item.current && "bg-blue-900 text-white hover:bg-blue-800"
                  )}
                >
                  <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-slate-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <span className="ml-3 flex-1 text-left">User</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
