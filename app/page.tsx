"use client"

import { useState, useMemo, useEffect, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Download,
  Zap,
  Award,
  Activity,
  BarChart3,
  Search,
  Filter,
  Star,
  CloudLightningIcon as Lightning,
  Building2,
  Shield,
  Bug,
  FileText,
  Code,
  Timer,
  Calculator,
  Brain,
  Lightbulb,
  Workflow,
  Database,
} from "lucide-react"

// Real data based on the problem statement
const developers = [
  {
    id: "dev-1",
    name: "Aakarsh Mahajan",
    leaves: "09/06 - 15/06", // 5 working days
    avatar: "AM",
    color: "from-slate-600 to-slate-700",
    skill: "Full Stack",
    experience: 5,
    department: "Engineering",
  },
  {
    id: "dev-2",
    name: "Yash Moda",
    leaves: "01/05 - 10/05", // 8 working days (overlaps with sprint start)
    avatar: "YM",
    color: "from-blue-600 to-blue-700",
    skill: "Frontend",
    experience: 3,
    department: "Engineering",
  },
  {
    id: "dev-3",
    name: "Naman",
    leaves: "10/05 - 20/05", // 9 working days
    avatar: "NM",
    color: "from-emerald-600 to-emerald-700",
    skill: "Backend",
    experience: 4,
    department: "Engineering",
  },
  {
    id: "dev-4",
    name: "Sumit Wadhwa",
    leaves: "08/05 - 31/05", // 18 working days (extends beyond sprint)
    avatar: "SW",
    color: "from-amber-600 to-amber-700",
    skill: "DevOps",
    experience: 6,
    department: "Infrastructure",
  },
  {
    id: "dev-5",
    name: "Ayushman Bajpayee",
    leaves: "12/06 - 16/06", // 3 working days (at sprint end)
    avatar: "AB",
    color: "from-indigo-600 to-indigo-700",
    skill: "Full Stack",
    experience: 4,
    department: "Engineering",
  },
  {
    id: "dev-6",
    name: "Anushri Laddha",
    leaves: "06/06 - 10/06", // 3 working days
    avatar: "AL",
    color: "from-rose-600 to-rose-700",
    skill: "Frontend",
    experience: 2,
    department: "Engineering",
  },
  {
    id: "dev-7",
    name: "Priyanshu Gupta",
    leaves: "11/06 - 15/06", // 3 working days (at sprint end)
    avatar: "PG",
    color: "from-teal-600 to-teal-700",
    skill: "Backend",
    experience: 3,
    department: "Engineering",
  },
]

// Jira issues data with exact fields mentioned in problem statement
const jiraIssues = [
  {
    id: "PROJ-101",
    developer: "Aakarsh Mahajan",
    storyPoints: 8,
    issueType: "Story",
    status: "Done",
    techStartDate: "2024-05-08",
    techCloseDate: "2024-05-15",
    priority: "High",
    epic: "User Authentication",
    actualDays: 5, // Working days between start and close
  },
  {
    id: "PROJ-102",
    developer: "Yash Moda",
    storyPoints: 5,
    issueType: "Bug",
    status: "Done",
    techStartDate: "2024-05-12",
    techCloseDate: "2024-05-18",
    priority: "Critical",
    epic: "Payment System",
    actualDays: 4,
  },
  {
    id: "PROJ-103",
    developer: "Naman",
    storyPoints: 13,
    issueType: "Story",
    status: "In Progress",
    techStartDate: "2024-05-22",
    techCloseDate: null,
    priority: "Medium",
    epic: "API Optimization",
    actualDays: 15, // Still in progress
  },
  {
    id: "PROJ-104",
    developer: "Sumit Wadhwa",
    storyPoints: 3,
    issueType: "Task",
    status: "Done",
    techStartDate: "2024-06-01",
    techCloseDate: "2024-06-05",
    priority: "Low",
    epic: "Infrastructure",
    actualDays: 3,
  },
  {
    id: "PROJ-105",
    developer: "Ayushman Bajpayee",
    storyPoints: 8,
    issueType: "Story",
    status: "Done",
    techStartDate: "2024-05-07",
    techCloseDate: "2024-05-20",
    priority: "High",
    epic: "Dashboard",
    actualDays: 9,
  },
  {
    id: "PROJ-106",
    developer: "Anushri Laddha",
    storyPoints: 5,
    issueType: "Bug",
    status: "Done",
    techStartDate: "2024-05-15",
    techCloseDate: "2024-05-25",
    priority: "Medium",
    epic: "User Interface",
    actualDays: 7,
  },
  {
    id: "PROJ-107",
    developer: "Priyanshu Gupta",
    storyPoints: 10,
    issueType: "Story",
    status: "Done",
    techStartDate: "2024-05-10",
    techCloseDate: "2024-05-28",
    priority: "High",
    epic: "Data Processing",
    actualDays: 13,
  },
  {
    id: "PROJ-108",
    developer: "Aakarsh Mahajan",
    storyPoints: 3,
    issueType: "Bug",
    status: "Done",
    techStartDate: "2024-05-20",
    techCloseDate: "2024-05-22",
    priority: "Critical",
    epic: "Production Issues",
    actualDays: 2,
  },
  {
    id: "PROJ-109",
    developer: "Yash Moda",
    storyPoints: 8,
    issueType: "Story",
    status: "Done",
    techStartDate: "2024-05-25",
    techCloseDate: "2024-06-05",
    priority: "Medium",
    epic: "Feature Enhancement",
    actualDays: 8,
  },
  {
    id: "PROJ-110",
    developer: "Naman",
    storyPoints: 5,
    issueType: "Task",
    status: "Done",
    techStartDate: "2024-06-01",
    techCloseDate: "2024-06-08",
    priority: "Low",
    epic: "Code Refactoring",
    actualDays: 5,
  },
]

// Sprint period as specified in problem statement
const sprintPeriod = { start: "2024-05-07", end: "2024-06-10" }

// Animated counter component
const AnimatedCounter = memo(
  ({
    value,
    duration = 2000,
    suffix = "",
    prefix = "",
  }: { value: number; duration?: number; suffix?: string; prefix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)

        setCount(Math.floor(easeOutCubic * value))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [value, duration])

    return (
      <span className="tabular-nums">
        {prefix}
        {count}
        {suffix}
      </span>
    )
  },
)

AnimatedCounter.displayName = "AnimatedCounter"

// Utility functions for bandwidth calculation
function parseLeaves(leavesStr: string) {
  const [start, end] = leavesStr.split(" - ")
  return {
    start: `2024-${start.split("/").reverse().join("-")}`,
    end: `2024-${end.split("/").reverse().join("-")}`,
  }
}

function calculateWorkingDays(startDate: string, endDate: string, excludeWeekends = true) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  let days = 0

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (!excludeWeekends || (d.getDay() !== 0 && d.getDay() !== 6)) {
      days++
    }
  }
  return days
}

function calculateLeaveDays(leavesStr: string, sprintStart: string, sprintEnd: string) {
  const { start: leaveStart, end: leaveEnd } = parseLeaves(leavesStr)
  const overlapStart = new Date(Math.max(new Date(leaveStart).getTime(), new Date(sprintStart).getTime()))
  const overlapEnd = new Date(Math.min(new Date(leaveEnd).getTime(), new Date(sprintEnd).getTime()))

  if (overlapStart <= overlapEnd) {
    return calculateWorkingDays(overlapStart.toISOString().split("T")[0], overlapEnd.toISOString().split("T")[0])
  }
  return 0
}

// --- Bandwidth calculation helper (pure function) ---
function calculateBandwidth(dev: any, issues: any[]) {
  const totalSprintDays = calculateWorkingDays(sprintPeriod.start, sprintPeriod.end)
  const leaveDays = calculateLeaveDays(dev.leaves, sprintPeriod.start, sprintPeriod.end)
  const availableDays = totalSprintDays - leaveDays
  const totalCapacity = availableDays * 4
  const effectiveCapacity = totalCapacity * 0.8

  const completedPoints = issues
    .filter((issue) => issue.status === "Done")
    .reduce((sum, issue) => sum + issue.storyPoints, 0)

  const bugPoints = issues
    .filter((issue) => issue.issueType === "Bug" && issue.status === "Done")
    .reduce((sum, issue) => sum + issue.storyPoints, 0)

  const velocity = availableDays > 0 ? completedPoints / availableDays : 0
  const utilization = effectiveCapacity > 0 ? (completedPoints / effectiveCapacity) * 100 : 0

  return {
    totalSprintDays,
    leaveDays,
    availableDays,
    totalCapacity,
    effectiveCapacity,
    completedPoints,
    bugPoints,
    velocity,
    utilization,
    issues,
  }
}

// --- Velocity/team analysis (pure function) ---
function analyzeVelocity(bandwidthData: any[]) {
  const avgVelocity = bandwidthData.reduce((sum, dev) => sum + dev.velocity, 0) / bandwidthData.length

  const highPerformers = bandwidthData.filter((dev) => dev.velocity > avgVelocity * 1.2)
  const underPerformers = bandwidthData.filter((dev) => dev.velocity < avgVelocity * 0.8)
  const consistentPerformers = bandwidthData.filter(
    (dev) => dev.velocity >= avgVelocity * 0.8 && dev.velocity <= avgVelocity * 1.2,
  )

  const totalEffectiveCapacity = bandwidthData.reduce((sum, dev) => sum + dev.effectiveCapacity, 0)
  const totalCompletedPoints = bandwidthData.reduce((sum, dev) => sum + dev.completedPoints, 0)
  const teamUtilization = (totalCompletedPoints / totalEffectiveCapacity) * 100

  const totalBugPoints = bandwidthData.reduce((sum, dev) => sum + dev.bugPoints, 0)
  const bugImpactPercentage = (totalBugPoints / totalCompletedPoints) * 100

  return {
    avgVelocity,
    highPerformers,
    underPerformers,
    consistentPerformers,
    teamUtilization,
    bugImpactPercentage,
    totalEffectiveCapacity,
    totalCompletedPoints,
  }
}

// --- Recommendations generator (pure function) ---
function generateRecommendations(analysis: any, bandwidthData: any[]) {
  const recs: any[] = []

  if (analysis.teamUtilization < 70) {
    recs.push({
      priority: "high",
      title: "Low Team Utilization",
      description: `Team is only utilizing ${analysis.teamUtilization.toFixed(1)}% of effective capacity.`,
      action: "Increase sprint commitment by 20-30%",
      icon: TrendingUp,
      color: "amber",
    })
  } else if (analysis.teamUtilization > 95) {
    recs.push({
      priority: "high",
      title: "Over-Capacity Risk",
      description: `Team is at ${analysis.teamUtilization.toFixed(1)}% utilization. Risk of burnout.`,
      action: "Reduce commitment by 10-15% or add team members",
      icon: AlertTriangle,
      color: "red",
    })
  }

  if (analysis.bugImpactPercentage > 25) {
    recs.push({
      priority: "high",
      title: "High Bug Impact",
      description: `${analysis.bugImpactPercentage.toFixed(1)}% of effort spent on bugs.`,
      action: "Increase test coverage & code reviews",
      icon: Bug,
      color: "red",
    })
  }

  if (analysis.underPerformers.length > 0) {
    recs.push({
      priority: "medium",
      title: "Performance Support Needed",
      description: `${analysis.underPerformers.length} members below avg velocity.`,
      action: "Provide mentoring / pair programming",
      icon: Users,
      color: "blue",
    })
  }

  const highLeaveDays = bandwidthData.filter((d) => d.leaveDays > 5)
  if (highLeaveDays.length > 0) {
    recs.push({
      priority: "medium",
      title: "Leave Impact on Sprint",
      description: `${highLeaveDays.length} members have >5 leave days.`,
      action: "Redistribute work and adjust capacity",
      icon: Calendar,
      color: "amber",
    })
  }

  const velocityVariance =
    bandwidthData.reduce((sum, d) => sum + Math.pow(d.velocity - analysis.avgVelocity, 2), 0) / bandwidthData.length
  if (velocityVariance > 1) {
    recs.push({
      priority: "low",
      title: "Velocity Inconsistency",
      description: "High variance in velocities detected.",
      action: "Standardize estimation & story breakdown",
      icon: Target,
      color: "blue",
    })
  }

  return recs
}

export default function JiraBandwidthDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBySkill, setFilterBySkill] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"name" | "velocity" | "utilization">("velocity")
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null)

  // Calculate bandwidth data for all developers
  const bandwidthData = useMemo(() => {
    return developers
      .filter((dev) => {
        if (searchTerm && !dev.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
        if (filterBySkill !== "all" && dev.skill !== filterBySkill) return false
        return true
      })
      .map((dev) => {
        const devIssues = jiraIssues.filter((issue) => issue.developer === dev.name)
        const calculation = calculateBandwidth(dev, devIssues)
        return { ...dev, ...calculation }
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name)
          case "velocity":
            return b.velocity - a.velocity
          case "utilization":
            return b.utilization - a.utilization
          default:
            return 0
        }
      })
  }, [searchTerm, filterBySkill, sortBy])

  const analysis = analyzeVelocity(bandwidthData)
  const recommendations = generateRecommendations(analysis, bandwidthData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-8 text-white shadow-2xl">
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Jira Bandwidth & Velocity Dashboard</h1>
                    <p className="text-slate-300 text-lg">Sprint Performance Analysis & Planning Tool</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-300" />
                    <span className="text-slate-200">Sprint Period: May 7 - June 10, 2024 (25 working days)</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
                    <Database className="w-3 h-3 mr-1" />
                    Live Jira Data
                  </Badge>
                </div>
              </div>
              <Button className="bg-white/15 hover:bg-white/20 text-white border-white/30">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-5 h-5 text-slate-300" />
                <Input
                  placeholder="Search developers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-300"
                />
              </div>
              <Select value={filterBySkill} onValueChange={setFilterBySkill}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy as any}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="velocity">Sort by Velocity</SelectItem>
                  <SelectItem value="utilization">Sort by Utilization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Team Size</CardTitle>
              <Users className="h-5 w-5 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">
                <AnimatedCounter value={bandwidthData.length} />
              </div>
              <p className="text-xs text-slate-500 mt-1">Active developers</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">Total Capacity</CardTitle>
              <Target className="h-5 w-5 text-emerald-700" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-800">
                <AnimatedCounter value={Math.round(analysis.totalEffectiveCapacity)} />
              </div>
              <p className="text-xs text-emerald-600 mt-1">Story points (after 20% deduction)</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Completed Points</CardTitle>
              <CheckCircle className="h-5 w-5 text-blue-700" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                <AnimatedCounter value={analysis.totalCompletedPoints} />
              </div>
              <p className="text-xs text-blue-600 mt-1">
                <AnimatedCounter value={Math.round(analysis.teamUtilization)} suffix="%" /> utilization
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">Avg Velocity</CardTitle>
              <TrendingUp className="h-5 w-5 text-amber-700" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800 tabular-nums">{analysis.avgVelocity.toFixed(1)}</div>
              <p className="text-xs text-amber-600 mt-1">Points per day</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Bug Impact</CardTitle>
              <Bug className="h-5 w-5 text-red-700" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800 tabular-nums">
                <AnimatedCounter value={Math.round(analysis.bugImpactPercentage)} suffix="%" />
              </div>
              <p className="text-xs text-red-600 mt-1">Of total effort</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bandwidth" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 border border-slate-200 backdrop-blur-sm shadow-lg rounded-xl p-2">
            <TabsTrigger
              value="bandwidth"
              className="rounded-lg data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Bandwidth Analysis
            </TabsTrigger>
            <TabsTrigger
              value="velocity"
              className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Velocity Tracking
            </TabsTrigger>
            <TabsTrigger
              value="issues"
              className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Issue Analysis
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-2" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bandwidth" className="space-y-8">
            {/* Individual Developer Cards */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-xl border-b border-slate-200">
                <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
                  <Calculator className="w-6 h-6" />
                  Individual Bandwidth Calculation
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Detailed bandwidth analysis based on Jira data and leave tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                  {bandwidthData.map((dev, index) => (
                    <div
                      key={dev.id}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
                      onClick={() => setSelectedDeveloper(selectedDeveloper === dev.id ? null : dev.id)}
                    >
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <Avatar className={`w-16 h-16 bg-gradient-to-br ${dev.color} shadow-lg`}>
                              <AvatarFallback className="text-white font-bold text-xl">{dev.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-xl text-slate-800">{dev.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-slate-600 text-white text-xs">{dev.skill}</Badge>
                                <Badge variant="outline" className="text-xs">
                                  {dev.experience}y exp
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-600">Leave: {dev.leaves}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-slate-800 tabular-nums">
                              <AnimatedCounter value={Math.round(dev.utilization)} suffix="%" />
                            </div>
                            <div className="text-sm text-slate-600">Utilization</div>
                          </div>
                        </div>

                        {/* Bandwidth Calculation Grid */}
                        <div className="grid grid-cols-5 gap-3 mb-6">
                          <div className="text-center p-3 bg-slate-100 rounded-lg">
                            <div className="text-lg font-bold text-slate-700">{dev.totalSprintDays}</div>
                            <div className="text-xs text-slate-600">Sprint Days</div>
                          </div>
                          <div className="text-center p-3 bg-red-100 rounded-lg">
                            <div className="text-lg font-bold text-red-700">{dev.leaveDays}</div>
                            <div className="text-xs text-red-600">Leave Days</div>
                          </div>
                          <div className="text-center p-3 bg-emerald-100 rounded-lg">
                            <div className="text-lg font-bold text-emerald-700">{dev.availableDays}</div>
                            <div className="text-xs text-emerald-600">Available</div>
                          </div>
                          <div className="text-center p-3 bg-blue-100 rounded-lg">
                            <div className="text-lg font-bold text-blue-700">{Math.round(dev.effectiveCapacity)}</div>
                            <div className="text-xs text-blue-600">Capacity</div>
                          </div>
                          <div className="text-center p-3 bg-amber-100 rounded-lg">
                            <div className="text-lg font-bold text-amber-700">{dev.completedPoints}</div>
                            <div className="text-xs text-amber-600">Completed</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-700">Capacity Utilization</span>
                            <span className="text-slate-700 tabular-nums">{Math.round(dev.utilization)}%</span>
                          </div>
                          <Progress value={dev.utilization} className="h-2" />
                        </div>

                        {/* Velocity Indicator */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-slate-600">Velocity: {dev.velocity.toFixed(1)} pts/day</span>
                          </div>
                          <Badge
                            className={`${
                              dev.velocity >= analysis.avgVelocity * 1.2
                                ? "bg-emerald-600"
                                : dev.velocity >= analysis.avgVelocity * 0.8
                                  ? "bg-amber-600"
                                  : "bg-red-600"
                            } text-white`}
                          >
                            {dev.velocity >= analysis.avgVelocity * 1.2
                              ? "High Performer"
                              : dev.velocity >= analysis.avgVelocity * 0.8
                                ? "On Track"
                                : "Needs Support"}
                          </Badge>
                        </div>

                        {/* Detailed Breakdown */}
                        {selectedDeveloper === dev.id && (
                          <div className="mt-6 p-4 bg-slate-50 rounded-lg border animate-in slide-in-from-top duration-300">
                            <h4 className="font-semibold mb-3 text-slate-800">Detailed Calculation</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Total Sprint Days:</span>
                                <span className="font-medium">{dev.totalSprintDays} days</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Leave Days (overlapping):</span>
                                <span className="font-medium text-red-600">-{dev.leaveDays} days</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Available Working Days:</span>
                                <span className="font-medium text-emerald-600">{dev.availableDays} days</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Total Capacity (4 pts/day):</span>
                                <span className="font-medium">{dev.totalCapacity} points</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">20% Deduction (bugs/unplanned):</span>
                                <span className="font-medium text-amber-600">
                                  -{Math.round(dev.totalCapacity * 0.2)} points
                                </span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="text-slate-700 font-medium">Effective Capacity:</span>
                                <span className="font-bold text-blue-600">
                                  {Math.round(dev.effectiveCapacity)} points
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-700 font-medium">Actual Completed:</span>
                                <span className="font-bold text-emerald-600">{dev.completedPoints} points</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-700 font-medium">Bug Points:</span>
                                <span className="font-bold text-red-600">{dev.bugPoints} points</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="velocity" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Velocity Distribution */}
              <Card className="border-0 shadow-lg bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Velocity Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bandwidthData.map((dev, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-semibold text-sm">
                          {dev.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{dev.name}</span>
                            <span className="tabular-nums">{dev.velocity.toFixed(1)}</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(dev.velocity / Math.max(...bandwidthData.map((d) => d.velocity))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Categories */}
              <Card className="border-0 shadow-lg bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Performance Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">High Performers</span>
                    <Badge className="bg-emerald-600 text-white">
                      <Lightning className="w-3 h-3 mr-1" />
                      {analysis.highPerformers.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Consistent Performers</span>
                    <Badge className="bg-amber-600 text-white">
                      <Target className="w-3 h-3 mr-1" />
                      {analysis.consistentPerformers.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Need Support</span>
                    <Badge className="bg-red-600 text-white">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {analysis.underPerformers.length}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">
                        <AnimatedCounter value={Math.round(analysis.teamUtilization)} suffix="%" />
                      </div>
                      <div className="text-sm text-slate-600">Team Utilization</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performer */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Award className="w-5 h-5" />
                    Sprint MVP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const topPerformer = bandwidthData.reduce((prev, current) =>
                      prev.velocity > current.velocity ? prev : current,
                    )
                    return (
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className={`w-16 h-16 bg-gradient-to-br ${topPerformer.color} shadow-lg`}>
                            <AvatarFallback className="text-white font-bold text-xl">
                              {topPerformer.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-2 shadow-lg">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">{topPerformer.name}</h3>
                          <p className="text-sm text-amber-700">
                            {topPerformer.skill} • {topPerformer.department}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Lightning className="w-4 h-4 text-amber-500" />
                            <span className="font-semibold text-amber-600 tabular-nums">
                              {topPerformer.velocity.toFixed(1)} pts/day
                            </span>
                          </div>
                          <div className="text-xs text-amber-600 mt-1">
                            {Math.round(topPerformer.utilization)}% capacity utilization
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="issues" className="space-y-8">
            <Card className="border-0 shadow-lg bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
                  <Activity className="w-6 h-6" />
                  Jira Issue Analysis
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Detailed breakdown of issues by type, status, and developer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {bandwidthData.map((dev, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <Avatar className={`w-12 h-12 bg-gradient-to-br ${dev.color} shadow-lg`}>
                          <AvatarFallback className="text-white font-bold">{dev.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-slate-800">{dev.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-slate-600 text-white">{dev.issues.length} issues</Badge>
                            <Badge className="bg-emerald-600 text-white">
                              {dev.issues.filter((i) => i.status === "Done").length} completed
                            </Badge>
                            <Badge className="bg-red-600 text-white">
                              {dev.issues.filter((i) => i.issueType === "Bug").length} bugs
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-700 tabular-nums">{dev.completedPoints}</div>
                          <div className="text-sm text-slate-600">Total Points</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {dev.issues.length > 0 ? (
                          dev.issues.map((issue, issueIndex) => (
                            <div
                              key={issueIndex}
                              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                            >
                              <div className="flex items-center gap-4">
                                <Badge
                                  className={`${
                                    issue.issueType === "Bug"
                                      ? "bg-red-600"
                                      : issue.issueType === "Story"
                                        ? "bg-blue-600"
                                        : "bg-slate-600"
                                  } text-white`}
                                >
                                  {issue.issueType === "Bug" ? (
                                    <Bug className="w-3 h-3 mr-1" />
                                  ) : issue.issueType === "Story" ? (
                                    <FileText className="w-3 h-3 mr-1" />
                                  ) : (
                                    <Code className="w-3 h-3 mr-1" />
                                  )}
                                  {issue.issueType}
                                </Badge>
                                <span className="font-bold text-slate-800">{issue.id}</span>
                                <Badge
                                  className={`${
                                    issue.status === "Done" ? "bg-emerald-600" : "bg-amber-600"
                                  } text-white`}
                                >
                                  {issue.status === "Done" ? (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                  ) : (
                                    <Timer className="w-3 h-3 mr-1" />
                                  )}
                                  {issue.status}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    issue.priority === "Critical"
                                      ? "border-red-300 text-red-700"
                                      : issue.priority === "High"
                                        ? "border-amber-300 text-amber-700"
                                        : "border-blue-300 text-blue-700"
                                  }`}
                                >
                                  {issue.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className="text-sm text-slate-600">Duration</div>
                                  <div className="text-xs text-slate-500 tabular-nums">
                                    {issue.techStartDate} - {issue.techCloseDate || "In Progress"}
                                  </div>
                                </div>
                                <div className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg">
                                  <span className="font-bold text-slate-700 tabular-nums">{issue.storyPoints} pts</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-500">No issues assigned in this sprint period</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-8">
            <Card className="border-0 shadow-lg bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
                  <Brain className="w-6 h-6" />
                  Sprint Planning Recommendations
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Data-driven insights for improving future sprint planning and team performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-l-4 ${
                        rec.priority === "high"
                          ? "border-red-500 bg-red-50"
                          : rec.priority === "medium"
                            ? "border-amber-500 bg-amber-50"
                            : "border-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            rec.color === "red"
                              ? "bg-red-600"
                              : rec.color === "amber"
                                ? "bg-amber-600"
                                : rec.color === "blue"
                                  ? "bg-blue-600"
                                  : "bg-emerald-600"
                          } text-white`}
                        >
                          <rec.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-800">{rec.title}</h3>
                            <Badge
                              className={`${
                                rec.priority === "high"
                                  ? "bg-red-600"
                                  : rec.priority === "medium"
                                    ? "bg-amber-600"
                                    : "bg-blue-600"
                              } text-white text-xs`}
                            >
                              {rec.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-700 mb-3">{rec.description}</p>
                          <div className="p-3 bg-white rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span className="font-medium text-slate-700">Recommended Action:</span>
                            </div>
                            <p className="text-slate-600">{rec.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Future Sprint Planning */}
                <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <h3 className="font-bold text-xl text-indigo-800 mb-4 flex items-center gap-2">
                    <Workflow className="w-5 h-5" />
                    Future Sprint Planning Guidelines
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-2">Capacity Planning</h4>
                      <ul className="space-y-1 text-sm text-indigo-600">
                        <li>• Plan for {Math.round(analysis.totalEffectiveCapacity)} story points capacity</li>
                        <li>• Account for 20% buffer for bugs and unplanned work</li>
                        <li>• Consider leave schedules when committing to stories</li>
                        <li>• Target 80-90% utilization for sustainable pace</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-2">Team Optimization</h4>
                      <ul className="space-y-1 text-sm text-indigo-600">
                        <li>• Pair high and low performers for knowledge transfer</li>
                        <li>• Distribute complex stories across experienced developers</li>
                        <li>• Allocate bug fixes to developers with domain knowledge</li>
                        <li>• Plan for skill development and cross-training</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
