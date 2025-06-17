import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ArrowUpCircle, ArrowDownCircle, Circle } from 'lucide-react'; // Example icons for priority

export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Backlog';
export type IssuePriority = 'High' | 'Medium' | 'Low' | 'None';

interface IssueListItemProps {
  id: string | number;
  title: string;
  projectKey?: string; // e.g., "PROJ"
  status: IssueStatus;
  priority: IssuePriority;
  assignee?: { name: string; avatarUrl?: string };
  commentCount?: number;
  updatedAt: string; // Formatted date string
  onClick?: (id: string | number) => void;
}

const statusColors: Record<IssueStatus, string> = {
  'Open': 'bg-blue-500 hover:bg-blue-600',
  'In Progress': 'bg-yellow-500 hover:bg-yellow-600',
  'Resolved': 'bg-green-500 hover:bg-green-600',
  'Closed': 'bg-gray-500 hover:bg-gray-600',
  'Backlog': 'bg-purple-500 hover:bg-purple-600',
};

const priorityIcons: Record<IssuePriority, React.ElementType> = {
  'High': ArrowUpCircle,
  'Medium': Circle, // Using Circle as a neutral middle, could be ArrowRight
  'Low': ArrowDownCircle,
  'None': Circle,
};

const priorityColors: Record<IssuePriority, string> = {
  'High': 'text-red-500',
  'Medium': 'text-yellow-500',
  'Low': 'text-green-500',
  'None': 'text-gray-400',
};

const IssueListItem: React.FC<IssueListItemProps> = ({
  id,
  title,
  projectKey,
  status,
  priority,
  assignee,
  commentCount = 0,
  updatedAt,
  onClick,
}) => {
  console.log("Rendering IssueListItem:", id, title);
  const PriorityIcon = priorityIcons[priority] || Circle;

  const content = (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
      <div className="flex-grow mb-2 sm:mb-0">
        <CardTitle className="text-lg hover:text-blue-600 transition-colors">
          {projectKey ? `${projectKey}-${id}` : `#${id}`}: {title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500 mt-1">
          Last updated: {updatedAt}
        </CardDescription>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0 flex-shrink-0">
        {assignee && (
          <Avatar className="h-7 w-7">
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
            <AvatarFallback>{assignee.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex items-center" title={`Priority: ${priority}`}>
          <PriorityIcon className={`h-5 w-5 ${priorityColors[priority]}`} />
        </div>
        <Badge variant="secondary" className={`${statusColors[status]} text-white text-xs`}>
          {status}
        </Badge>
        {commentCount > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            {commentCount}
          </div>
        )}
      </div>
    </div>
  );

  // If onClick is provided, wrap in a button. Otherwise, wrap in a Link.
  // Assuming the link goes to an issue detail page.
  const itemPath = `/issues/${projectKey ? `${projectKey}-` : ''}${id}`;

  return (
    <Card className="mb-3 transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        {onClick ? (
          <button onClick={() => onClick(id)} className="block w-full text-left focus:outline-none">
            {content}
          </button>
        ) : (
          <Link to={itemPath} className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md">
            {content}
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default IssueListItem;