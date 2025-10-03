import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Plus } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import { mockJobs } from '@/lib/mockData';
import { Job } from '@/types';
import { showSuccess } from '@/utils/toast';

const Jobs = () => {
  const [jobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesSpecialization = specializationFilter === 'all' || job.specialization === specializationFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'locum' && job.type === 'locum') ||
                      (activeTab === 'full-time' && job.type === 'full-time');

    return matchesSearch && matchesLocation && matchesSpecialization && matchesTab;
  });

  const locumJobs = jobs.filter(job => job.type === 'locum');
  const fullTimeJobs = jobs.filter(job => job.type === 'full-time');

  const handleApply = () => {
    showSuccess('Application submitted successfully!');
  };

  const handleContact = () => {
    showSuccess('Message sent to job poster!');
  };

  const specializations = Array.from(new Set(jobs.map(job => job.specialization)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Enter city..."
                    value={locationFilter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {locations.map(location => (
                    <Badge
                      key={location}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => setLocationFilter(location)}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Specialization</label>
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All specializations</SelectItem>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setSpecializationFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jobs & Locum Opportunities</h1>
              <p className="text-gray-600">Find your next medical opportunity</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
              <TabsTrigger value="locum">Locum ({locumJobs.length})</TabsTrigger>
              <TabsTrigger value="full-time">Full-Time ({fullTimeJobs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleApply}
                      onContact={handleContact}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="text-gray-500">No jobs found matching your criteria.</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchTerm('');
                          setLocationFilter('');
                          setSpecializationFilter('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="locum" className="mt-6">
              <div className="space-y-4">
                {filteredJobs.filter(job => job.type === 'locum').map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onContact={handleContact}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="full-time" className="mt-6">
              <div className="space-y-4">
                {filteredJobs.filter(job => job.type === 'full-time').map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onContact={handleContact}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Jobs;