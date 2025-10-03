import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Building2,
  Stethoscope,
  Verified
} from 'lucide-react';
import { Job } from '@/types';
import { formatDistanceToNow, format } from 'date-fns';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onContact?: (jobId: string) => void;
}

const JobCard = ({ job, onApply, onContact }: JobCardProps) => {
  const isLocum = job.type === 'locum';

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                variant={isLocum ? "default" : "secondary"}
                className={isLocum ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isLocum ? 'Locum Position' : 'Full-Time Position'}
              </Badge>
              <span className="text-xs text-gray-500">
                Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>{job.hospital}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-4 h-4" />
                <span>{job.specialization}</span>
              </div>
              {isLocum && job.duration && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{job.duration}</span>
                </div>
              )}
            </div>

            {isLocum && job.startDate && job.endDate && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(job.startDate), 'MMM dd')} - {format(new Date(job.endDate), 'MMM dd, yyyy')}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

        {/* Posted By */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {job.postedByName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-900">{job.postedByName}</span>
                <Verified className="w-3 h-3 text-blue-500" />
              </div>
              <span className="text-xs text-gray-500">Posted by</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContact?.(job.id)}
            >
              Contact
            </Button>
            <Button
              size="sm"
              onClick={() => onApply?.(job.id)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLocum ? 'Apply for Locum' : 'Apply Now'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;