"use client";
import React from 'react';
import { Calendar, DollarSign, Home, Image, LayoutDashboard, Mail, MessageSquare, PieChart, Plus, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 7000 },
  { month: 'Aug', revenue: 6500 },
  { month: 'Sep', revenue: 8000 },
  { month: 'Oct', revenue: 7500 },
  { month: 'Nov', revenue: 9000 },
  { month: 'Dec', revenue: 10000 },
]

const growthData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 150 },
  { month: 'Mar', students: 200 },
  { month: 'Apr', students: 180 },
  { month: 'May', students: 250 },
  { month: 'Jun', students: 300 },
  { month: 'Jul', students: 350 },
  { month: 'Aug', students: 400 },
  { month: 'Sep', students: 450 },
  { month: 'Oct', students: 500 },
  { month: 'Nov', students: 550 },
  { month: 'Dec', students: 600 },
]

export default function page() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 new students this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Completion Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">+4.3% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132,540</div>
            <p className="text-xs text-muted-foreground">+14.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue for the past year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Growth</CardTitle>
            <CardDescription>New student registrations over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Student" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium">New student enrolled</p>
                  <p className="text-sm text-muted-foreground">John Doe joined "Advanced Web Development"</p>
                </div>
                <div className="ml-auto font-medium text-sm">2m ago</div>
              </li>
              <li className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Instructor" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium">New course published</p>
                  <p className="text-sm text-muted-foreground">Sarah Smith published "Machine Learning Basics"</p>
                </div>
                <div className="ml-auto font-medium text-sm">1h ago</div>
              </li>
              <li className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Student" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium">Course completed</p>
                  <p className="text-sm text-muted-foreground">Alex Johnson completed "Python for Beginners"</p>
                </div>
                <div className="ml-auto font-medium text-sm">3h ago</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add New Course
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Schedule Webinar
            </Button>
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" /> Send Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
