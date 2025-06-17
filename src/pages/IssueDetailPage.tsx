import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import RichTextEditorIntegration from '@/components/RichTextEditorIntegration';
import ActivityLogEntry from '@/components/ActivityLogEntry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Edit3, MessageCircle, ListChecks } from 'lucide-react';

// Mock data - in a real app, this would be fetched based on issueId
const sampleIssue = {
  id: 'TASK-123',
  title: 'Design new dashboard homepage layout',
  description: '<p>The current dashboard homepage needs a refresh. We need to consider the following:</p><ul><li>Key metrics display</li><li>Recent activity feed</li><li>Quick access to frequent actions</li></ul><p>Please provide mockups by EOW.</p>',
  status: 'In Progress' as 'Open' | 'In Progress' | 'Resolved',
  priority: 'High' as 'High' | 'Medium' | 'Low',
  assignee: { name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40/28A745/FFFFFF?Text=JD' },
  reporter: { name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/40/DC3545/FFFFFF?Text=JS' },
  createdAt: '2023-03-15T10:00:00Z',
  updatedAt: '2023-03-18T14:30:00Z',
  project: { id: 'PROJ-X', name: 'Phoenix Initiative' },
  comments: [
    { id: 'c1', user: { name: 'Alice Wonderland', avatarUrl: 'https://via.placeholder.com/32/FFA500/000000?Text=A' }, content: 'Looks good, I will start on this.', timestamp: '2023-03-16T11:00:00Z' },
    { id: 'c2', user: { name: 'Bob The Builder', avatarUrl: 'https://via.placeholder.com/32/007BFF/FFFFFF?Text=B' }, content: 'Can we also consider adding a chart for user engagement?', timestamp: '2023-03-17T09:20:00Z' },
  ],
  activityLog: [
    { id: 'a1', user: { name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/32/DC3545/FFFFFF?Text=JS' }, action: 'created the issue', timestamp: '2023-03-15T10:00:00Z' },
    { id: 'a2', user: { name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40/28A745/FFFFFF?Text=JD' }, action: 'changed status to In Progress', timestamp: '2023-03-16T09:00:00Z', details: 'Started working on initial draft.' },
    { id: 'a3', user: { name: 'Alice Wonderland', avatarUrl: 'https://via.placeholder.com/32/FFA500/000000?Text=A' }, action: 'added a comment', timestamp: '2023-03-16T11:00:00Z' },
  ]
};

const IssueDetailPage = () => {
  const { issueId } = useParams<{ issueId: string }>();
  console.log(`IssueDetailPage loaded for issue: ${issueId}`);
  const navigate = useNavigate();

  // Fetch issue data based on issueId, for now use sampleIssue
  const issue = { ...sampleIssue, id: issueId || sampleIssue.id };

  const handleCommentSubmit = (commentText: string) => {
    console.log('New comment submitted:', commentText);
    // Add logic to post comment
  };

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
                </NavigationMenuList>
            </NavigationMenu>
        </aside>

        <main className="flex-1 p-6 space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/project-issues">{issue.project.name}</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Issue {issue.id}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-1">{issue.id}: {issue.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Reported by: 
                        <Avatar className="inline-block h-5 w-5 ml-1 relative -top-0.5">
                            <AvatarImage src={issue.reporter.avatarUrl} alt={issue.reporter.name} />
                            <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
                        </Avatar> {issue.reporter.name}
                    </span>
                    <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/create-edit-issue?id=${issue.id}`)}> {/* Placeholder for edit functionality */}
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Issue
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div><strong>Status:</strong> <Badge variant={issue.status === 'Resolved' ? 'default' : 'secondary'}>{issue.status}</Badge></div>
                <div><strong>Priority:</strong> <Badge variant={issue.priority === 'High' ? 'destructive' : 'outline'}>{issue.priority}</Badge></div>
                <div className="flex items-center"><strong>Assignee:</strong>
                  <Avatar className="h-6 w-6 ml-2">
                    <AvatarImage src={issue.assignee.avatarUrl} alt={issue.assignee.name} />
                    <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-1">{issue.assignee.name}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Description:</h3>
                <div className="prose prose-sm max-w-none p-3 border rounded-md bg-background" dangerouslySetInnerHTML={{ __html: issue.description }} />
              </div>

            </CardContent>
          </Card>

          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="details"><ListChecks className="mr-2 h-4 w-4 inline-block"/>Details</TabsTrigger>
              <TabsTrigger value="comments"><MessageCircle className="mr-2 h-4 w-4 inline-block"/>Comments ({issue.comments.length})</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 p-4 border rounded-md bg-background">
                <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
                <p><strong>Last Updated:</strong> {new Date(issue.updatedAt).toLocaleString()}</p>
                <p><strong>Project:</strong> {issue.project.name}</p>
                {/* More details here, potentially custom fields etc. */}
                <form className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="status-select" className="block text-sm font-medium text-muted-foreground mb-1">Change Status</label>
                            <Select defaultValue={issue.status}>
                                <SelectTrigger id="status-select"><SelectValue placeholder="Select status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="priority-select" className="block text-sm font-medium text-muted-foreground mb-1">Change Priority</label>
                            <Select defaultValue={issue.priority}>
                                <SelectTrigger id="priority-select"><SelectValue placeholder="Select priority" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button type="submit" size="sm">Update Details</Button>
                </form>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Comments</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {issue.comments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">{comment.user.name}</span>
                          <span className="text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 p-2 border rounded-md bg-stone-50" dangerouslySetInnerHTML={{ __html: comment.content }}/>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">Add a comment</h4>
                    {/* Using a form tag as a simple wrapper for the RichTextEditor and Button */}
                    <form onSubmit={(e) => { e.preventDefault(); /* handleCommentSubmit will be called by editor's onChange/onSave */ }}>
                      <RichTextEditorIntegration
                        onChange={handleCommentSubmit}
                        placeholder="Type your comment here..."
                        initialValue=""
                      />
                      <Button type="submit" className="mt-2">Post Comment</Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Activity Log</CardTitle></CardHeader>
                <CardContent className="divide-y">
                  {issue.activityLog.map(log => (
                    <ActivityLogEntry
                      key={log.id}
                      user={log.user}
                      action={log.action}
                      timestamp={log.timestamp}
                      details={log.details ? <p>{log.details}</p> : undefined}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default IssueDetailPage;