import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to connecting with medical professionals.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact our support team or explore:
            </p>
            <div className="flex justify-center space-x-4 mt-3">
              <Link to="/jobs" className="text-sm text-blue-600 hover:text-blue-700">
                Jobs
              </Link>
              <Link to="/connections" className="text-sm text-blue-600 hover:text-blue-700">
                Connections
              </Link>
              <Link to="/messages" className="text-sm text-blue-600 hover:text-blue-700">
                Messages
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;