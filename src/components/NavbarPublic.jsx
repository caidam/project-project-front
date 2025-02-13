// Navbar.jsx
import { Link, useLocation } from "react-router-dom"
import {
  PanelLeft,
  User,
  TvMinimalPlayIcon,
  Moon,
  Sun,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { useTheme } from '@/context/ThemeContext'
import { Separator } from './ui/separator'


const NavbarPublic = ( props ) => {

    // LOCATION
    const location = useLocation();

    // THEME
    const { theme, changeTheme } = useTheme();
    const handleThemeToggle = () => {
      changeTheme(theme === 'light' ? 'dark' : 'light');
    };

    // BREADCRUMBS
    const getBreadcrumbs = () => {
      const { pathname } = location;
    
      switch (true) {
        case pathname === '/tth':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        case pathname === '/landing':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/landing">Music Video Tracker</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/landing">Welcome</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        // Add more cases for other routes
        case pathname === '/login':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/landing">Music Video Tracker</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/login">Sign In</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
          case pathname === '/signup':
            return (
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/landing">Music Video Tracker</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/signup">Sign Up</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            );
        default:
          return null;
      }
    };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            // href="#"
            to="/landing"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <TvMinimalPlayIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Music Video Tracker</span>
          </Link>
          <Separator />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Separator />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleThemeToggle}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {theme === 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                //   href="#"
                  to="/landing"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <TvMinimalPlayIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Music Video Tracker</span>
                </Link>
                <Separator />
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 !text-muted-foreground hover:text-foreground"
                  onClick={handleThemeToggle}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  {theme === 'light' ? 'Switch Theme' : 'Switch Theme'}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Breadcrumb className="hidden md:flex">

            {getBreadcrumbs()}

          </Breadcrumb>

          <div className="relative ml-auto flex-1 md:grow-0">
          </div>
          
          {/* PROFILE MENU */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <User className="h-5 w-5 transition-all group-hover:scale-110" />
              </Button>


            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

            <>
              <Link to="/login"><DropdownMenuItem>Sign In</DropdownMenuItem></Link>
              <DropdownMenuSeparator />
              <Link to="/signup"><DropdownMenuItem>Sign Up</DropdownMenuItem></Link>
            </>

        </DropdownMenuContent>
        </DropdownMenu> */}
        </header>


        
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {props.children}
        </main>
      
      </div>
    </div>
  );
};

export default NavbarPublic;