import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import RichTextEditorIntegration from '@/components/RichTextEditorIntegration';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Fallback or part of RTE
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

// Mock data for select options
const mockProjects = [ {id: 'PROJ-A', name: 'Project Alpha'}, {id: 'PROJ-B', name: 'Project Beta'} ];
const mockUsers = [ {id: 'user1', name: 'Alice Wonderland'}, {id: 'user2', name: 'Bob The Builder'} ];
const statuses = ['Open', 'In Progress', 'Testing', 'Resolved', 'Closed', 'Backlog'];
const priorities = ['High', 'Medium', 'Low', 'None'];

const CreateEditIssuePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const issueIdForEdit = searchParams.get('id');
  
  console.log(`CreateEditIssuePage loaded. Editing ID: ${issueIdForEdit || 'None (New Issue)'}`);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('Medium');
  const [assigneeId, setAssigneeId] = useState('');
  // In a real app, fetch issue details if issueIdForEdit exists
  useEffect(() => {
    if (issueIdForEdit) {
      console.log(`Fetching data for issue ${issueIdForEdit} to prefill form...`);
      // Simulate fetching data
      setTitle(`Sample Title for ${issueIdForEdit}`);
      setDescription(`<p>This is a sample description for issue ${issueIdForEdit}.</p>`);
      setProjectId(mockProjects[0]?.id || '');
      setStatus('In Progress');
      setPriority('High');
      setAssigneeId(mockUsers[0]?.id || '');
    }
  }, [issueIdForEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issueData = { title, description, projectId, status, priority, assigneeId };
    if (issueIdForEdit) {
      console.log('Updating issue:', issueIdForEdit, issueData);
      // API call to update issue
    } else {
      console.log('Creating new issue:', issueData);
      // API call to create issue
    }
    navigate(`/issues/${issueIdForEdit || 'newly-created-id'}`); // Redirect to detail page
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header 
        userName="Demo User" 
        userAvatarUrl="https://via.placeholder.com/40/008080/FFFFFF?Text=DU"
        onProfileClick={handleProfileClick}
        // No global create issue on this page
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
        <main className="flex-1 p-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">{issueIdForEdit ? 'Edit Issue' : 'Create New Issue'}</CardTitle>
              <CardDescription>
                {issueIdForEdit ? `Modify the details for issue ${issueIdForEdit}.` : 'Fill in the details below to create a new issue.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter issue title" required />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditorIntegration
                    id="description"
                    initialValue={description}
                    onChange={setDescription}
                    placeholder="Provide a detailed description of the issue..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="project">Project</Label>
                    <Select value={projectId} onValueChange={setProjectId} required>
                      <SelectTrigger id="project"><SelectValue placeholder="Select project" /></SelectTrigger>
                      <SelectContent>
                        {mockProjects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assignee">Assignee (Optional)</Label>
                    <Select value={assigneeId} onValueChange={setAssigneeId}>
                      <SelectTrigger id="assignee"><SelectValue placeholder="Select assignee" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {mockUsers.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus} required>
                      <SelectTrigger id="status"><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={priority} onValueChange={setPriority} required>
                      <SelectTrigger id="priority"><SelectValue placeholder="Select priority" /></SelectTrigger>
                      <SelectContent>
                        {priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Fallback/Alternative: Simple Textarea if RichTextEditor is problematic or for simpler notes */}
                {/* <div>
                  <Label htmlFor="notes">Additional Notes (Textarea)</Label>
                  <Textarea id="notes" placeholder="Simple notes here..." />
                </div> */}

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                  <Button type="submit">{issueIdForEdit ? 'Save Changes' : 'Create Issue'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CreateEditIssuePage;