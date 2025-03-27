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
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark, Calendar, Clock, TrendingUp, Award, Users, FileText, CreditCard, Filter, LucideSearch, PlusCircle } from 'lucide-react';

const ContentAggregationPage = () => {
  // Sample article data
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "New Research Shows Community Credits Increase Participation by 47%",
      url: "https://example.com/research-1",
      author: "SarahT",
      authorRole: "Contributor",
      timestamp: "2 hours ago",
      score: 42,
      userVote: null,
      comments: 15,
      category: "Research",
      tags: ["Economy", "Participation", "Metrics"],
      creditsRequired: 0,
      isPromoted: false
    },
    {
      id: 2,
      title: "Tutorial: Building Effective Governance Proposals Step-by-Step",
      url: "https://example.com/tutorial-governance",
      author: "MikeJ",
      authorRole: "Steward",
      timestamp: "5 hours ago",
      score: 37,
      userVote: "up",
      comments: 8,
      category: "Tutorial",
      tags: ["Governance", "How-to", "Proposals"],
      creditsRequired: 0,
      isPromoted: false
    },
    {
      id: 3,
      title: "Community Spotlight: Interview with Council Member ElenaR",
      url: "https://example.com/spotlight-elena",
      author: "DavidC",
      authorRole: "Member",
      timestamp: "Yesterday",
      score: 24,
      userVote: null,
      comments: 12,
      category: "Community",
      tags: ["Interview", "Council", "Leadership"],
      creditsRequired: 0,
      isPromoted: true
    },
    {
      id: 4,
      title: "Proposal Discussion: Expanding the Credit Economy to External Partners",
      url: "https://example.com/proposal-discussion",
      author: "AlexW",
      authorRole: "Contributor",
      timestamp: "2 days ago",
      score: 19,
      userVote: "down",
      comments: 31,
      category: "Governance",
      tags: ["Credits", "Partnerships", "Proposals"],
      creditsRequired: 0,
      isPromoted: false
    },
    {
      id: 5,
      title: "Premium Content: Deep Dive into Community Credit Analytics",
      url: "https://example.com/premium-analytics",
      author: "SamH",
      authorRole: "Steward",
      timestamp: "3 days ago",
      score: 15,
      userVote: null,
      comments: 6,
      category: "Research",
      tags: ["Premium", "Analytics", "Economy"],
      creditsRequired: 15,
      isPromoted: false
    },
    {
      id: 6,
      title: "Member Success Story: How I Built a Sub-Community in 30 Days",
      url: "https://example.com/success-story",
      author: "LisaM",
      authorRole: "Contributor",
      timestamp: "4 days ago",
      score: 28,
      userVote: "up",
      comments: 9,
      category: "Community",
      tags: ["Success", "Growth", "Sub-communities"],
      creditsRequired: 0,
      isPromoted: false
    },
    {
      id: 7,
      title: "Technical Update: Platform Improvements Coming Next Week",
      url: "https://example.com/technical-update",
      author: "RobertK",
      authorRole: "Council",
      timestamp: "5 days ago",
      score: 31,
      userVote: null,
      comments: 24,
      category: "Announcement",
      tags: ["Technical", "Platform", "Updates"],
      creditsRequired: 0,
      isPromoted: false
    }
  ]);
  
  const [currentFilter, setCurrentFilter] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Handle voting
  const handleVote = (id, vote) => {
    setArticles(articles.map(article => {
      if (article.id === id) {
        // If user is removing their vote
        if (article.userVote === vote) {
          return {
            ...article,
            score: vote === 'up' ? article.score - 1 : article.score + 1,
            userVote: null
          };
        }
        // If user is changing their vote
        else if (article.userVote !== null) {
          return {
            ...article,
            score: vote === 'up' ? article.score + 2 : article.score - 2,
            userVote: vote
          };
        }
        // If user is voting for the first time
        else {
          return {
            ...article,
            score: vote === 'up' ? article.score + 1 : article.score - 1,
            userVote: vote
          };
        }
      }
      return article;
    }));
  };
  
  // Filter articles based on current selection
  const getFilteredArticles = () => {
    let filtered = [...articles];
    
    // Apply search filter if there's a query
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting based on current filter
    switch(currentFilter) {
      case "trending":
        return filtered.sort((a, b) => b.score - a.score);
      case "new":
        return filtered.sort((a, b) => {
          // This is a simplification - in reality you'd compare actual timestamps
          if (a.timestamp.includes("hour") && b.timestamp.includes("hour")) return a.timestamp.localeCompare(b.timestamp);
          if (a.timestamp.includes("hour")) return -1;
          if (b.timestamp.includes("hour")) return 1;
          if (a.timestamp.includes("day") && b.timestamp.includes("day")) return a.timestamp.localeCompare(b.timestamp);
          return a.timestamp.localeCompare(b.timestamp);
        });
      case "discussed":
        return filtered.sort((a, b) => b.comments - a.comments);
      default:
        return filtered;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-2 rounded-md">
            <FileText size={24} />
          </div>
          <h1 className="text-2xl font-bold">Community Content Hub</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-md">
            <CreditCard size={16} className="text-blue-600" />
            <span className="font-medium">125 Credits</span>
          </div>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
        <Tabs defaultValue="trending" className="w-full md:w-auto" onValueChange={setCurrentFilter}>
          <TabsList>
            <TabsTrigger value="trending" className="flex items-center">
              <TrendingUp size={16} className="mr-2" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>New</span>
            </TabsTrigger>
            <TabsTrigger value="discussed" className="flex items-center">
              <MessageSquare size={16} className="mr-2" />
              <span>Most Discussed</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <LucideSearch size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search content..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-1">
                <PlusCircle size={16} />
                <span>Submit</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit New Content</DialogTitle>
                <DialogDescription>
                  Share valuable resources with the community.
                </DialogDescription>
              </DialogHeader>
              
              <form className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input id="title" placeholder="Enter a descriptive title" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="url" className="text-sm font-medium">URL</label>
                  <Input id="url" placeholder="https://example.com/article" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
                  <Input id="tags" placeholder="governance, research, tutorial" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="premium" className="rounded" />
                  <label htmlFor="premium" className="text-sm">
                    Make this Premium Content (costs 5 credits to publish, earns 1 credit per reader)
                  </label>
                </div>
              </form>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  // Handle submission logic here
                  setDialogOpen(false);
                }}>Submit (costs 2 credits)</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">All</Badge>
        <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer">Research</Badge>
        <Badge className="bg-green-100 hover:bg-green-200 text-green-800 cursor-pointer">Tutorial</Badge>
        <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800 cursor-pointer">Community</Badge>
        <Badge className="bg-amber-100 hover:bg-amber-200 text-amber-800 cursor-pointer">Governance</Badge>
        <Badge className="bg-red-100 hover:bg-red-200 text-red-800 cursor-pointer">Announcement</Badge>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {getFilteredArticles().map(article => (
          <Card key={article.id} className={`${article.isPromoted ? 'border-blue-300 bg-blue-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex">
                {/* Voting */}
                <div className="flex flex-col items-center mr-4 space-y-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 rounded-full ${article.userVote === 'up' ? 'bg-green-100 text-green-600' : ''}`}
                    onClick={() => handleVote(article.id, 'up')}
                  >
                    <ArrowUp size={16} />
                  </Button>
                  
                  <span className="text-sm font-bold">{article.score}</span>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 rounded-full ${article.userVote === 'down' ? 'bg-red-100 text-red-600' : ''}`}
                    onClick={() => handleVote(article.id, 'down')}
                  >
                    <ArrowDown size={16} />
                  </Button>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <a href={article.url} className="text-lg font-medium hover:underline">{article.title}</a>
                      
                      {article.isPromoted && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800">Promoted</Badge>
                      )}
                      
                      {article.creditsRequired > 0 && (
                        <Badge className="ml-2 bg-purple-100 text-purple-800">Premium ({article.creditsRequired} credits)</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-3">
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{article.author}</span>
                      <Badge variant="outline" className="ml-1 text-xs">{article.authorRole}</Badge>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{article.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-gray-50">{article.category}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-3">
                    <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-gray-700">
                      <MessageSquare size={14} className="mr-1" />
                      <span>{article.comments} comments</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-gray-700">
                      <Share2 size={14} className="mr-1" />
                      <span>Share</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-gray-700">
                      <Bookmark size={14} className="mr-1" />
                      <span>Save</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-1">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm" className="bg-blue-50">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
      
      {/* Sidebar (would be visible on larger screens) */}
      <div className="hidden lg:block fixed right-4 top-20 w-64">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Content Stats</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Articles Today</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Articles</span>
                <span className="font-medium">1,278</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Your Submissions</span>
                <span className="font-medium">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Your Earn Rate</span>
                <span className="font-medium">14 credits/week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Top Contributors</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {name: "SarahT", points: 1240, role: "Contributor"},
                {name: "MikeJ", points: 985, role: "Steward"},
                {name: "ElenaR", points: 780, role: "Council"},
                {name: "DavidC", points: 645, role: "Member"},
                {name: "AlexW", points: 520, role: "Contributor"}
              ].map((contributor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500 w-5">{index+1}.</div>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{contributor.name}</div>
                    <div className="text-xs text-gray-500">{contributor.role}</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <Award size={12} className="text-yellow-500 mr-1" />
                    <span>{contributor.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">View All Contributors</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ContentAggregationPage;
