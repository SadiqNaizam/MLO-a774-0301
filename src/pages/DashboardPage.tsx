import React from 'react';
import Header from '@/components/layout/Header';
import IssueListItem, { IssueStatus, IssuePriority } from '@/components/IssueListItem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { PlusCircle, BarChart2, FolderKanban } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const placeholderIssues = [
  { id: 'TASK-101', title: 'Fix login button responsiveness on mobile', projectKey: 'PROJ-A', status: 'Open' as IssueStatus, priority: 'High' as IssuePriority, assignee: { name: 'Alice Wonderland', avatarUrl: 'https://via.placeholder.com/32/FFA500/000000?Text=A' }, updatedAt: '2 days ago', commentCount: 3 },
  { id: 'TASK-102', title: 'Implement new user onboarding flow', projectKey: 'PROJ-B', status: 'In Progress' as IssueStatus, priority: 'Medium' as IssuePriority, assignee: { name: 'Bob The Builder', avatarUrl: 'https://via.placeholder.com/32/007BFF/FFFFFF?Text=B' }, updatedAt: '5 hours ago', commentCount: 1 },
  { id: 'TASK-103', title: 'Update documentation for API v2', projectKey: 'PROJ-A', status: 'Backlog' as IssueStatus, priority: 'Low' as IssuePriority, updatedAt: '1 week ago', commentCount: 0 },
];

const projectSummaries = [
  { id: 'proj1', name: 'Project Phoenix', openIssues: 15, progress: 60, lastActivity: 'Today' },
  { id: 'proj2', name: 'Project Titan', openIssues: 8, progress: 30, lastActivity: 'Yesterday' },
  { id: 'proj3', name: 'Project Nova', openIssues: 22, progress: 85, lastActivity: '3 days ago' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

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
              {/* Add more navigation items here */}
            </NavigationMenuList>
          </NavigationMenu>
          <Button onClick={handleCreateIssue} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Issue
          </Button>
        </aside>

        <main className="flex-1 p-6 space-y-6">
          <section>
            <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projectSummaries.map(project => (
                <Card key={project.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{project.openIssues} <span className="text-sm text-muted-foreground">open issues</span></div>
                    <p className="text-xs text-muted-foreground">Progress: {project.progress}%</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">Last activity: {project.lastActivity}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">My Open Issues</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/project-issues')}>View All</Button>
            </div>
            <div className="space-y-3">
              {placeholderIssues.slice(0, 2).map(issue => ( // Show a few examples
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
              ))}
              {placeholderIssues.length === 0 && <p className="text-muted-foreground">No open issues assigned to you. Great job!</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
             <Card>
                <CardHeader>
                    <CardTitle>Overall Activity</CardTitle>
                    <CardDescription>A quick glance at system stats.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                        <p className="text-2xl font-bold">125</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Resolved This Week</p>
                        <p className="text-2xl font-bold">18</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                        <p className="text-2xl font-bold">42</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                        <p className="text-2xl font-bold">7</p>
                    </div>
                </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;