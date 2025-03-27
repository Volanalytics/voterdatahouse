// Inside your prototype components
const Navigation = () => (
  <div className="bg-gray-100 p-3 flex justify-between items-center">
    <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      Back to Prototypes
    </Link>
    <a href="https://voterdatahouse.com" className="text-gray-600 hover:text-gray-800">
      VoterDataHouse Main Site
    </a>
  </div>
);

// Add this component at the top of your render method
return (
  <div>
    <Navigation />
    {/* Rest of your prototype code */}
  </div>
);

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { User, Settings, MessageSquare, BarChart4, Vote, CreditCard, UserCheck, Users, ShieldCheck } from 'lucide-react';

const CommunityPlatformMVP = () => {
  // State management for the MVP
  const [activeTab, setActiveTab] = useState('dashboard');
  const [creditBalance, setCreditBalance] = useState(100);
  const [proposals, setProposals] = useState([
    { id: 1, title: 'Community Content Guidelines', votes: 24, status: 'active', category: 'governance' },
    { id: 2, title: 'New Feature: Mentorship Program', votes: 18, status: 'active', category: 'feature' },
    { id: 3, title: 'Increase Content Creator Credits', votes: 32, status: 'completed', category: 'economy' }
  ]);
  const [contributions, setContributions] = useState([
    { id: 1, title: 'Community Onboarding Guide', type: 'content', credits: 15, date: '2025-03-15' },
    { id: 2, title: 'Platform UI Improvements', type: 'development', credits: 25, date: '2025-03-10' },
    { id: 3, title: 'New Member Welcome Committee', type: 'community', credits: 10, date: '2025-03-20' }
  ]);

  // Sample data for charts
  const creditActivityData = [
    { name: 'Week 1', earned: 45, spent: 15 },
    { name: 'Week 2', earned: 30, spent: 25 },
    { name: 'Week 3', earned: 60, spent: 30 },
    { name: 'Week 4', earned: 40, spent: 35 }
  ];

  const governanceParticipationData = [
    { name: 'Proposals', value: 42 },
    { name: 'Votes', value: 156 },
    { name: 'Comments', value: 89 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const communityGrowthData = [
    { name: 'Jan', members: 120 },
    { name: 'Feb', members: 180 },
    { name: 'Mar', members: 240 }
  ];

  // Handle proposal voting (simplified)
  const handleVote = (proposalId) => {
    // Check if user has enough credits
    if (creditBalance >= 5) {
      // Update credit balance
      setCreditBalance(prev => prev - 5);
      
      // Update proposal votes
      setProposals(proposals.map(proposal => 
        proposal.id === proposalId 
          ? {...proposal, votes: proposal.votes + 1} 
          : proposal
      ));
    }
  };

  // Handle contribution submission (simplified)
  const handleContribution = () => {
    // In a real implementation, this would open a form or modal
    alert("Contribution form would open here. After review, credits would be awarded.");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-2 rounded-md">
            <Users size={24} />
          </div>
          <h1 className="text-2xl font-bold">Community Platform</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-md">
            <CreditCard size={16} className="text-blue-600" />
            <span className="font-medium">{creditBalance} Credits</span>
          </div>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <BarChart4 size={16} />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex items-center space-x-2">
            <Vote size={16} />
            <span>Governance</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center space-x-2">
            <Users size={16} />
            <span>Community</span>
          </TabsTrigger>
          <TabsTrigger value="credits" className="flex items-center space-x-2">
            <CreditCard size={16} />
            <span>Credits</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Overview</CardTitle>
                <CardDescription>Current status and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Active Members</p>
                    <p className="text-2xl font-bold">243</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Contributions</p>
                    <p className="text-2xl font-bold">87</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Open Proposals</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Credits Circulating</p>
                    <p className="text-2xl font-bold">5,280</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Growth</CardTitle>
                <CardDescription>Member growth over time</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={communityGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="members" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest community updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: <UserCheck size={16} />, text: "Sarah joined the community", time: "2 hours ago" },
                    { icon: <MessageSquare size={16} />, text: "New discussion: Platform Roadmap", time: "4 hours ago" },
                    { icon: <Vote size={16} />, text: "Proposal #12 passed with 76% approval", time: "1 day ago" },
                    { icon: <CreditCard size={16} />, text: "Monthly credit distribution completed", time: "2 days ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Activity</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Contributions</CardTitle>
                <CardDescription>Your recent community involvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div key={contribution.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{contribution.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{contribution.type}</Badge>
                          <span className="text-xs text-gray-500">{contribution.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <CreditCard size={14} />
                        <span>+{contribution.credits}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleContribution}>New Contribution</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Proposals</CardTitle>
                  <CardDescription>Vote on current community proposals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proposals.filter(p => p.status === 'active').map((proposal) => (
                      <div key={proposal.id} className="border p-4 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{proposal.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{proposal.category}</Badge>
                              <span className="text-sm text-gray-500">{proposal.votes} votes</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            className="flex items-center space-x-1"
                            onClick={() => handleVote(proposal.id)}
                          >
                            <Vote size={14} />
                            <span>Vote (5 credits)</span>
                          </Button>
                        </div>
                        <div className="mt-3">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${Math.min(proposal.votes * 2, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View All Proposals</Button>
                  <Button>Create Proposal</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Governance Stats</CardTitle>
                  <CardDescription>Participation metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={governanceParticipationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {governanceParticipationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Governance Levels</CardTitle>
                  <CardDescription>Role-based access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { level: "Member", rights: "Vote on proposals", credits: "10+ credits" },
                      { level: "Contributor", rights: "Create proposals", credits: "50+ credits" },
                      { level: "Steward", rights: "Moderate & implement", credits: "150+ credits" }
                    ].map((level, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck size={16} className={index === 2 ? "text-purple-600" : index === 1 ? "text-blue-600" : "text-green-600"} />
                          <span className="font-medium">{level.level}</span>
                        </div>
                        <p className="text-sm mt-1">{level.rights}</p>
                        <p className="text-xs text-gray-500 mt-1">Required: {level.credits}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Credits Tab */}
        <TabsContent value="credits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Balance</CardTitle>
                <CardDescription>Your community currency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <CreditCard size={48} />
                  </div>
                  <p className="text-4xl font-bold">{creditBalance}</p>
                  <p className="text-gray-500 mt-1">Available Credits</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button className="w-full">Earn More</Button>
                  <Button variant="outline" className="w-full">Transfer</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Activity</CardTitle>
                <CardDescription>Earned vs. spent credits</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creditActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="earned" fill="#4CAF50" />
                    <Bar dataKey="spent" fill="#FF9800" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Ways to Earn Credits</CardTitle>
                <CardDescription>Contribute to earn community currency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Content Creation", description: "Write guides, articles, or resources", credits: "10-30 credits" },
                    { title: "Development", description: "Contribute code or technical improvements", credits: "20-50 credits" },
                    { title: "Community Support", description: "Help onboard and mentor new members", credits: "5-15 credits" },
                    { title: "Governance", description: "Create and review proposals", credits: "10-20 credits" },
                    { title: "Moderation", description: "Help maintain community standards", credits: "5-15 credits" },
                    { title: "Events", description: "Organize and facilitate community events", credits: "15-25 credits" }
                  ].map((way, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <h3 className="font-medium">{way.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{way.description}</p>
                      <p className="text-sm font-medium text-green-600 mt-2">{way.credits}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>Connect with other members</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would contain community features like member directories, discussion forums, and collaboration spaces.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your community presence</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This tab would contain profile management, contribution history, and personal settings.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPlatformMVP;
