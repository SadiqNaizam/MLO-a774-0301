import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User, Bell, Search, PlusCircle } from 'lucide-react'; // Example icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input'; // For a search bar example

interface HeaderProps {
  userName?: string;
  userAvatarUrl?: string;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onCreateIssueClick?: () => void; // Example action
}

const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatarUrl,
  onLogout,
  onProfileClick,
  onCreateIssueClick
}) => {
  console.log("Rendering Header");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-screen-2xl">
        {/* Logo/Brand - Assuming NavigationMenu might be a sibling or child */}
        <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
          {/* <YourLogoIcon className="h-6 w-6" /> */}
          <span className="font-bold sm:inline-block text-lg">IssueTracker</span>
        </Link>

        {/* Optional: Global Search */}
        <div className="relative flex-1 md:grow-0 mr-4 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search issues..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {onCreateIssueClick && (
            <Button variant="outline" size="sm" onClick={onCreateIssueClick} className="hidden sm:flex">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Issue
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatarUrl} alt={userName || 'User'} />
                  <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName || 'User Name'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {onLogout && (
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;