import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import IssueListItem, { IssueStatus, IssuePriority } from '@/components/IssueListItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ListFilter, PlusCircle, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const allIssues = [
  { id: 'PROJ1-1', title: 'Homepage UI Refresh', projectKey: 'PROJ1', status: 'Open' as IssueStatus, priority: 'High' as IssuePriority, assignee: { name: 'Carol Danvers', avatarUrl: 'https://via.placeholder.com/32/FF0000/FFFFFF?Text=C' }, updatedAt: '1 day ago', commentCount: 5 },
  { id: 'PROJ1-2', title: 'API endpoint for user data', projectKey: 'PROJ1', status: 'In Progress' as IssueStatus, priority: 'Medium' as IssuePriority, assignee: { name: 'Peter Parker', avatarUrl: 'https://via.placeholder.com/32/0000FF/FFFFFF?Text=P' }, updatedAt: '3 hours ago', commentCount: 2 },
  { id: 'PROJ2-5', title: 'Database schema migration', projectKey: 'PROJ2', status: 'Resolved' as IssueStatus, priority: 'High' as IssuePriority, assignee: { name: 'Diana Prince', avatarUrl: 'https://via.placeholder.com/32/FFFF00/000000?Text=D' }, updatedAt: '5 days ago', commentCount: 8 },
  { id: 'PROJ1-8', title: 'User authentication bug', projectKey: 'PROJ1', status: 'Open' as IssueStatus, priority: 'High' as IssuePriority, assignee: { name: 'Tony Stark', avatarUrl: 'https://via.placeholder.com/32/800080/FFFFFF?Text=T' }, updatedAt: '2 days ago', commentCount: 12 },
  { id: 'PROJ3-12', title: 'Setup CI/CD pipeline', projectKey: 'PROJ3', status: 'Backlog' as IssueStatus, priority: 'Low' as IssuePriority, updatedAt: '1 week ago', commentCount: 0 },
];

const ProjectIssuesPage = () => {
  console.log('ProjectIssuesPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Record<IssueStatus, boolean>>({
    'Open': false, 'In Progress': false, 'Resolved': false, 'Closed': false, 'Backlog': false
  });
  const [priorityFilter, setPriorityFilter] = useState<Record<IssuePriority, boolean>>({
    'High': false, 'Medium': false, 'Low': false, 'None': false
  });

  const filteredIssues = allIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const activeStatusFilters = Object.entries(statusFilter).filter(([, checked]) => checked).map(([status]) => status);
    const matchesStatus = activeStatusFilters.length === 0 || activeStatusFilters.includes(issue.status);
    const activePriorityFilters = Object.entries(priorityFilter).filter(([, checked]) => checked).map(([priority]) => priority);
    const matchesPriority = activePriorityFilters.length === 0 || activePriorityFilters.includes(issue.priority);
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const handleCreateIssue = () => {
    navigate('/create-issue');
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };


  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header 
        userName="Demo User" 
        userAvatarUrl="https://via.placeholder.com/40/008080/FFFFFF?Text=DU"
        onCreateIssueClick={handleCreateIssue}
        onProfileClick={handleProfileClick}
      />
       <div className="flex flex-1">
        <aside className="w-64 bg-background border-r p-4 space-y-4 hidden md:block">
          <NavigationMenu orientation="vertical" className="w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/dashboard" className={navigationMenuTriggerStyle() + " w-full justify-start"}>Dashboard</Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/project-issues" className={navigationMenuTriggerStyle() + " w-full justify-start"}>All Issues</Link>
              </NavigationMenuItem>
              {/* Add more items specific to project context if any */}
            </NavigationMenuList>
          </NavigationMenu>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">Project Issues</h1>
            <Button onClick={handleCreateIssue}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Issue
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-4 bg-background rounded-lg border">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search issues by title or ID..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4" /> Filter Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.keys(statusFilter).map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter[status as IssueStatus]}
                    onCheckedChange={(checked) => setStatusFilter(prev => ({ ...prev, [status]: checked }))}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4" /> Filter Priority
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.keys(priorityFilter).map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority}
                    checked={priorityFilter[priority as IssuePriority]}
                    onCheckedChange={(checked) => setPriorityFilter(prev => ({ ...prev, [priority]: checked }))}
                  >
                    {priority}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button>Apply Filters</Button> */}
          </div>

          <div className="mb-2 flex flex-wrap gap-2">
            {Object.entries(statusFilter).filter(([,v])=>v).map(([k]) => <Badge key={k} variant="secondary">{k}</Badge>)}
            {Object.entries(priorityFilter).filter(([,v])=>v).map(([k]) => <Badge key={k} variant="secondary">{k}</Badge>)}
          </div>

          <div className="space-y-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map(issue => (
                <IssueListItem
                  key={issue.id}
                  id={issue.id}
                  title={issue.title}
                  projectKey={issue.projectKey}
                  status={issue.status}
                  priority={issue.priority}
                  assignee={issue.assignee}
                  updatedAt={issue.updatedAt}
                  commentCount={issue.commentCount}
                />
              ))
            ) : (
              <Card className="p-10 text-center text-muted-foreground">
                No issues match your current filters.
              </Card>
            )}
          </div>

          {filteredIssues.length > 5 && ( /* Example: Show pagination if more than 5 issues */
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectIssuesPage;