import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';
import { User, Bell, ShieldCheck } from 'lucide-react';

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const navigate = useNavigate();

  // Form states - typically you'd fetch initial user data
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('https://via.placeholder.com/128/008080/FFFFFF?Text=DU');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile saved:', { name, email, avatarPreview });
    // API call to save profile
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log('Password change requested for:', email);
    // API call to change password
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log("Avatar selected:", e.target.files[0].name);
    }
  };

  const handleCreateIssue = () => {
    navigate('/create-issue');
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header 
        userName={name} 
        userAvatarUrl={avatarPreview}
        onCreateIssueClick={handleCreateIssue}
        onProfileClick={() => { /* Already on profile page */ }}
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
                <NavigationMenuItem className="w-full">
                    <Link to="/user-profile" className={navigationMenuTriggerStyle() + " w-full justify-start"}>User Profile</Link>
                </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-6">User Profile & Settings</h1>
          <Tabs defaultValue="profile" className="w-full max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile"><User className="mr-2 h-4 w-4 inline-block"/>Profile Information</TabsTrigger>
              <TabsTrigger value="account"><ShieldCheck className="mr-2 h-4 w-4 inline-block"/>Account Settings</TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block"/>Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and avatar.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSave} className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={avatarPreview} alt={name} />
                        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                    </div>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                    </div>
                    <Button type="submit" className="w-full">Save Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account security, like changing your password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
                    </div>
                    <Button type="submit" className="w-full">Change Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates and alerts via email.</p>
                    </div>
                    <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get real-time alerts directly on your device (if supported).</p>
                    </div>
                    <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                   <Button type="button" onClick={() => console.log("Notification settings saved")} className="w-full">Save Notification Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;