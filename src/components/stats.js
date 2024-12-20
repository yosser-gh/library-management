import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Users, BookOpen, Calendar, BookMarked } from 'lucide-react';
import 'tailwindcss/tailwind.css';

const Stats = () => {
  const monthlyStats = [
    { month: 'Jan', loans: 245, returns: 220, newUsers: 45, events: 8 },
    { month: 'Feb', loans: 285, returns: 260, newUsers: 52, events: 10 },
    { month: 'Mar', loans: 325, returns: 290, newUsers: 58, events: 12 },
    { month: 'Apr', loans: 380, returns: 340, newUsers: 65, events: 15 },
    { month: 'May', loans: 420, returns: 380, newUsers: 72, events: 14 },
    { month: 'Jun', loans: 390, returns: 360, newUsers: 68, events: 16 }
  ];

  const genreStats = [
    { genre: 'Fiction', count: 450, percentage: 35 },
    { genre: 'Non-Fiction', count: 380, percentage: 30 },
    { genre: 'Science', count: 220, percentage: 17 },
    { genre: 'History', count: 180, percentage: 14 },
    { genre: 'Others', count: 50, percentage: 4 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Active Users</p>
              <h3 className="text-2xl font-bold mt-2">1,284</h3>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% vs last month
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Books in Circulation</p>
              <h3 className="text-2xl font-bold mt-2">487</h3>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.2% vs last month
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
              <h3 className="text-2xl font-bold mt-2">16</h3>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +4 vs last month
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Late Returns</p>
              <h3 className="text-2xl font-bold mt-2">23</h3>
              <p className="text-sm text-red-600 flex items-center mt-2">
                <TrendingDown className="w-4 h-4 mr-1" />
                +3 vs last month
              </p>
            </div>
            <BookMarked className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Activity Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loans" stroke="#8884d8" name="Loans" />
              <Line type="monotone" dataKey="returns" stroke="#82ca9d" name="Returns" />
              <Line type="monotone" dataKey="newUsers" stroke="#ffc658" name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Collection by Genre</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4f46e5" name="Number of Books" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Stats;