import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns'; // For relative time

interface ActivityLogEntryProps {
  user: {
    name: string;
    avatarUrl?: string;
  };
  action: string; // e.g., "created the issue", "commented", "changed status to Open"
  timestamp: Date | string; // Date object or ISO string
  details?: React.ReactNode; // Optional further details or content of the activity
}

const ActivityLogEntry: React.FC<ActivityLogEntryProps> = ({
  user,
  action,
  timestamp,
  details,
}) => {
  console.log("Rendering ActivityLogEntry for user:", user.name, "action:", action);

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <div className="flex items-start space-x-3 py-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-medium text-primary">{user.name}</span>
            <span className="text-muted-foreground"> {action}</span>
          </p>
          <p className="text-xs text-muted-foreground" title={new Date(timestamp).toLocaleString()}>
            {timeAgo}
          </p>
        </div>
        {details && (
          <div className="text-sm text-muted-foreground p-2 border rounded-md bg-background">
            {details}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogEntry;