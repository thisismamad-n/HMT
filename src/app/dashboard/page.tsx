'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { MoreHorizontal, ChevronDown, Send, CreditCard, Plus, Minus, ChevronRight, ChevronLeft, TrendingUp } from "lucide-react";
import Sidebar from '@/components/Sidebar';
import { cn } from "@/lib/utils";
import { format, startOfMonth, isToday } from 'date-fns-jalali';
import { faIR } from 'date-fns-jalali/locale';
import { Chatbot } from "@/components/ui/chatbot";
import { Label as RechartsLabel, Pie, PieChart, Sector, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, XAxis, YAxis, CartesianGrid, Area } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [moveGoal, setMoveGoal] = useState<number>(350);
  const [message, setMessage] = useState('');
  const [activityData, setActivityData] = useState<number[]>([60, 70, 55, 65, 50, 60, 70, 75, 65, 70, 55, 60]);
  const [isClient, setIsClient] = useState(false);

  // Site traffic data
  const siteTrafficData = [
    { name: 'شنبه', desktop: 4000, mobile: 2400 },
    { name: 'یکشنبه', desktop: 3000, mobile: 1398 },
    { name: 'دوشنبه', desktop: 2000, mobile: 9800 },
    { name: 'سه‌شنبه', desktop: 2780, mobile: 3908 },
    { name: 'چهارشنبه', desktop: 1890, mobile: 4800 },
    { name: 'پنج‌شنبه', desktop: 2390, mobile: 3800 },
    { name: 'جمعه', desktop: 3490, mobile: 4300 },
  ];

  // Subscriptions chart data
  const subscriptionsChartData = [
    { name: '1', value: 1800 },
    { name: '2', value: 1950 },
    { name: '3', value: 1850 },
    { name: '4', value: 2000 },
    { name: '5', value: 2100 },
    { name: '6', value: 2250 },
    { name: '7', value: 2400 },
    { name: '8', value: 2350 },
  ];

  // Use useEffect to set client-side rendering flag and generate random data only on client
  useEffect(() => {
    setIsClient(true);
    // Only update activity data after the component is mounted on client
    setActivityData(getActivityData());
  }, []);

  // Team members
  const teamMembers = [
    {
      name: 'علی محمدی',
      email: 'ali@example.com',
      role: 'مدیر'
    },
    {
      name: 'سارا احمدی',
      email: 'sara@example.com',
      role: 'عضو'
    },
    {
      name: 'محمد حسینی',
      email: 'mohammad@example.com',
      role: 'عضو'
    }
  ];

  // Chat messages
  const chatMessages = [
    {
      sender: 'علی محمدی',
      email: 'ali@example.com',
      message: 'سلام، چطور می‌توانم به شما کمک کنم؟',
      isUser: false,
      timestamp: new Date()
    },
    {
      sender: 'شما',
      message: "سلام، من در مورد گزارش مالی ماه گذشته سوالی داشتم.",
      isUser: true,
      timestamp: new Date()
    },
    {
      sender: 'علی محمدی',
      email: 'ali@example.com',
      message: 'بله، چه سوالی دارید؟',
      isUser: false,
      timestamp: new Date()
    }
  ];

  // Payment data
  const payments = [
    { status: 'موفق', email: 'reza@example.com', amount: '۱۲٬۵۰۰٬۰۰۰ ریال' },
    { status: 'موفق', email: 'amir@example.com', amount: '۹٬۸۰۰٬۰۰۰ ریال' },
    { status: 'در حال پردازش', email: 'mina@example.com', amount: '۳۱٬۵۰۰٬۰۰۰ ریال' },
    { status: 'ناموفق', email: 'sara@example.com', amount: '۲۷٬۳۰۰٬۰۰۰ ریال' },
  ];

  // Cookie settings state
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    functional: false,
    performance: false
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Document sharing state
  const documentUsers = [
    { 
      name: 'فاطمه رضایی', 
      email: 'fateme@example.com', 
      permission: 'ویرایش' 
    },
    { 
      name: 'زهرا احمدی', 
      email: 'zahra@example.com', 
      permission: 'مشاهده' 
    },
    {
      name: 'حسن محمدی',
      email: 'hasan@example.com',
      permission: 'مشاهده'
    }
  ];

  // Add business sectors data
  const businessSectorsData = [
    { sector: 'خدمات', revenue: 35, fill: '#4338ca' },
    { sector: 'تولیدی', revenue: 25, fill: '#3b82f6' },
    { sector: 'تجاری', revenue: 20, fill: '#06b6d4' },
    { sector: 'فناوری', revenue: 15, fill: '#10b981' },
    { sector: 'سایر', revenue: 5, fill: '#f59e0b' },
  ];

  const businessSectorsConfig = {
    revenue: {
      label: "درآمد",
    },
    خدمات: {
      label: "خدمات",
      color: "#4338ca",
    },
    تولیدی: {
      label: "تولیدی",
      color: "#3b82f6",
    },
    تجارت: {
      label: "تجارت",
      color: "#06b6d4",
    },
    فناوری: {
      label: "فناوری",
      color: "#10b981",
    },
    سایر: {
      label: "سایر",
      color: "#f59e0b",
    },
  } satisfies ChartConfig;

  // Calculate activity goal bar heights - now only used client-side
  const getActivityData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 30);
  };

  return (
    <>
      <style jsx global>{`
        .dashboard-container::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23a8a8a8' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.1;
          mix-blend-mode: overlay;
        }
        
        .enhanced-card {
          position: relative;
        }
        
        .enhanced-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.03;
          z-index: 0;
          border-radius: inherit;
        }
      `}</style>
      <div className="flex min-h-screen bg-background dashboard-container">
        {/* Background accent elements */}
        <div className="bg-accent bg-accent-1"></div>
        <div className="bg-accent bg-accent-2"></div>
        <div className="bg-accent bg-accent-3"></div>
        
        {/* Collapsible Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 pl-[var(--sidebar-width)] relative z-0">
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Total Revenue Card */}
              <Card className="overflow-hidden enhanced-card revenue-card">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-sm font-medium">درآمد کل</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold mb-1">۵۸۷٬۵۰۰٬۰۰۰ ریال</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="data-highlight positive">+٪۲۰.۱</span> نسبت به ماه قبل
                  </p>
                  <div className="h-[70px] mt-4 w-full">
                    <svg className="w-full h-full" viewBox="0 0 300 80">
                      <path 
                        d="M0,60 L40,50 L80,30 L120,45 L160,55 L200,50 L240,35 L300,10" 
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                      />
                      <circle cx="0" cy="60" r="3" fill="currentColor" />
                      <circle cx="40" cy="50" r="3" fill="currentColor" />
                      <circle cx="80" cy="30" r="3" fill="currentColor" />
                      <circle cx="120" cy="45" r="3" fill="currentColor" />
                      <circle cx="160" cy="55" r="3" fill="currentColor" />
                      <circle cx="200" cy="50" r="3" fill="currentColor" />
                      <circle cx="240" cy="35" r="3" fill="currentColor" />
                      <circle cx="300" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Subscriptions Card */}
              <Card className="overflow-hidden enhanced-card subscriptions-card">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-sm font-medium">اشتراک‌ها</CardTitle>
                  <CardDescription className="text-xs">+۲,۳۵۰</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center gap-4">
                    <div className="font-extrabold text-lg data-highlight positive">+٪۱۸۰.۱ نسبت به ماه قبل</div>
                  </div>
                  <div className="h-[70px] mt-3 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={subscriptionsChartData}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorSubscriptions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#colorSubscriptions)"
                          isAnimationActive={true}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col">
                                    <span className="font-bold">
                                      {(payload[0].value as number).toLocaleString('fa-IR')}
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Card */}
              <Card className="overflow-hidden enhanced-card">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-sm font-medium">تقویم</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mt-2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate: Date | undefined) => newDate && setDate(newDate)}
                      locale={faIR}
                      showOutsideDays={false}
                      className="rounded-md"
                      classNames={{
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-full",
                        button_reset: "w-8 h-8 p-0 text-sm",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
                        nav_button_previous: "mr-1",
                        nav_button_next: "ml-1",
                        caption: "flex justify-center relative items-center py-4 mx-auto",
                        caption_label: "flex-1 text-center font-medium",
                        day: "w-9 h-9 p-0 mx-auto font-normal text-sm",
                        table: "w-full border-collapse",
                        head_row: "flex justify-between w-full",
                        row: "flex justify-between w-full mt-1",
                        cell: "text-center p-0 relative h-9 w-9",
                        weeknumber: "text-sm opacity-50",
                        head_cell: "text-muted-foreground w-9 font-normal text-[0.8rem] pb-2",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
                        IconRight: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Sectors Chart */}
              <Card className="overflow-hidden enhanced-card flex flex-col">
                <CardHeader className="p-4 pb-0 items-center">
                  <CardTitle className="text-sm font-medium">بخش‌های کسب و کار</CardTitle>
                  <CardDescription className="text-xs">فروردین - شهریور ۱۴۰۳</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-1 pb-0">
                  <div className="mx-auto h-[150px] w-full chart-container subtle-animation">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={businessSectorsData}
                          dataKey="revenue"
                          nameKey="sector"
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          label={({ sector }) => sector}
                          labelLine={false}
                        >
                          {businessSectorsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                      {payload[0].name}
                                    </span>
                                    <span className="font-bold">
                                      {payload[0].value} میلیون تومان
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-1 text-xs pb-4">
                  <div className="flex items-center gap-1 font-medium leading-none">
                    <span className="data-highlight positive">رشد ٪۵.۲ نسبت به ماه قبل</span> <TrendingUp className="h-3 w-3 mr-1" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    نمایش کل درآمد در ۶ ماه گذشته
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Team Members Card */}
              <Card className="md:col-span-4 overflow-hidden enhanced-card team-card">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">اعضای تیم</CardTitle>
                  <CardDescription className="text-xs">اعضای تیم خود را برای همکاری دعوت کنید.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <Select defaultValue={member.role === 'مدیر' ? 'مدیر' : 'عضو'}>
                          <SelectTrigger className="h-8 w-[90px] text-xs">
                                <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="مدیر">مدیر</SelectItem>
                            <SelectItem value="عضو">عضو</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Card */}
              <Card className="md:col-span-4 overflow-hidden enhanced-card">
                <CardContent className="p-0">
                  <Chatbot />
                </CardContent>
              </Card>
              
              {/* Business Activity Card */}
              <Card className="md:col-span-4 overflow-hidden enhanced-card">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-base">آمار فعالیت‌های کسب و کار</CardTitle>
                  <CardDescription className="text-xs">عملکرد کسب و کار شما بهتر از حد معمول است.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                  <div className="h-[150px] w-full subtle-animation">
                    <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                      <path 
                        d="M0,125 C50,50 100,100 150,25 C200,100 250,75 300,125" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                      />
                      <circle cx="150" cy="25" r="4" fill="currentColor" />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Business Roadmap Card */}
              <Card className="md:col-span-6 lg:col-span-8 overflow-hidden enhanced-card">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">نقشه راه توسعه کسب و کار</CardTitle>
                      <CardDescription className="text-xs">مسیر آینده کسب و کار شما با برنامه تیم ما</CardDescription>
                    </div>
                    <Select defaultValue="q2">
                      <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1">سه‌ماهه اول</SelectItem>
                        <SelectItem value="q2">سه‌ماهه دوم</SelectItem>
                        <SelectItem value="q3">سه‌ماهه سوم</SelectItem>
                        <SelectItem value="q4">سه‌ماهه چهارم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-5">
                    {/* Timeline Line */}
                    <div className="relative mt-6">
                      <div className="absolute top-0 left-4 right-4 h-0.5 bg-border"></div>
                      <div className="relative flex justify-between px-4">
                        {/* Milestone 1 - Complete */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-primary"></div>
                          <div className="mt-2 text-xs text-center">
                            <div className="font-medium">تحلیل بازار</div>
                            <div className="text-muted-foreground text-[10px]">تکمیل شده</div>
                          </div>
                        </div>
                        
                        {/* Milestone 2 - In Progress */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full border-2 border-primary bg-background relative">
                            <div className="absolute inset-0.5 rounded-full bg-primary pulse-animation"></div>
                          </div>
                          <div className="mt-2 text-xs text-center">
                            <div className="font-medium">طراحی استراتژی</div>
                            <div className="text-muted-foreground text-[10px]">در حال انجام</div>
                          </div>
                        </div>
                        
                        {/* Milestone 3 - Upcoming */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground bg-background"></div>
                          <div className="mt-2 text-xs text-center">
                            <div className="font-medium">پیاده‌سازی</div>
                            <div className="text-muted-foreground text-[10px]">۳۰ روز آینده</div>
                          </div>
                        </div>
                        
                        {/* Milestone 4 - Future */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground bg-background"></div>
                          <div className="mt-2 text-xs text-center">
                            <div className="font-medium">بازبینی و بهبود</div>
                            <div className="text-muted-foreground text-[10px]">۶۰ روز آینده</div>
                          </div>
                        </div>
                        
                        {/* Milestone 5 - Future */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground bg-background"></div>
                          <div className="mt-2 text-xs text-center">
                            <div className="font-medium">توسعه محصول</div>
                            <div className="text-muted-foreground text-[10px]">۹۰ روز آینده</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Current Focus */}
                    <div className="mt-8 border rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">تمرکز فعلی: طراحی استراتژی</div>
                      <div className="text-xs text-muted-foreground">
                        تیم ما در حال تدوین استراتژی‌های بازاریابی و فروش متناسب با نیازهای کسب و کار شما هستند. این مرحله شامل شناسایی مشتریان هدف، تحلیل رقبا و تعیین کانال‌های فروش مناسب است.
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-xs">پیشرفت:</div>
                          <div className="w-32 h-2 bg-secondary rounded-full">
                            <div className="h-full w-[65%] bg-primary rounded-full"></div>
                          </div>
                          <div className="text-xs">٪۶۵</div>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                          <span>مشاهده جزئیات</span>
                          <ChevronLeft className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Key Deliverables */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="border rounded p-2">
                        <div className="text-xs font-medium mb-1">استراتژی بازاریابی</div>
                        <div className="text-[10px] text-muted-foreground">تحویل در ۱۵ روز آینده</div>
                      </div>
                      <div className="border rounded p-2">
                        <div className="text-xs font-medium mb-1">فرآیند فروش</div>
                        <div className="text-[10px] text-muted-foreground">تحویل در ۲۰ روز آینده</div>
                      </div>
                      <div className="border rounded p-2">
                        <div className="text-xs font-medium mb-1">نقشه مشتری</div>
                        <div className="text-[10px] text-muted-foreground">تحویل در ۲۵ روز آینده</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Site Traffic Card */}
              <Card className="md:col-span-2 lg:col-span-4 overflow-hidden enhanced-card">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-sm font-medium">آمار بازدید سایت</CardTitle>
                  <CardDescription className="text-xs">۷ روز گذشته</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={siteTrafficData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="name" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          vertical={false} 
                          stroke="hsl(var(--border))"
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-xs text-muted-foreground">دسکتاپ</span>
                                      <span className="font-bold">
                                        {(payload[0].value as number).toLocaleString('fa-IR')}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-xs text-muted-foreground">موبایل</span>
                                      <span className="font-bold">
                                        {(payload[1].value as number).toLocaleString('fa-IR')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="desktop"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#colorDesktop)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="mobile"
                          stroke="hsl(var(--secondary))"
                          fillOpacity={1}
                          fill="url(#colorMobile)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Payments Card */}
              <Card className="md:col-span-6 overflow-hidden enhanced-card mt-4">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div>
                    <CardTitle className="text-base">تراکنش‌های مالی</CardTitle>
                    <CardDescription className="text-xs">مدیریت تراکنش‌های مالی کسب و کار</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="جستجوی ایمیل..." className="max-w-[200px] h-8 text-xs" />
                    <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1">
                      فیلترها <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead className="text-xs">وضعیت</TableHead>
                        <TableHead className="text-xs">ایمیل <ChevronDown className="h-3 w-3 inline-block ml-1 opacity-50" /></TableHead>
                        <TableHead className="text-right text-xs">مبلغ</TableHead>
                        <TableHead className="w-[40px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <input type="radio" className="h-3 w-3" />
                          </TableCell>
                          <TableCell className="text-xs">{payment.status}</TableCell>
                          <TableCell className="text-xs">{payment.email}</TableCell>
                          <TableCell className="text-right text-xs">{payment.amount}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex items-center justify-between pt-3 text-xs">
                    <div className="text-muted-foreground">
                      ۰ از ۴ سطر انتخاب شده
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">قبلی</Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">بعدی</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Create Account Card */}
              <Card className="md:col-span-6 overflow-hidden enhanced-card mt-4">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">اضافه کردن اکانت های دیگر</CardTitle>
                  <CardDescription className="text-xs">برای ایجاد حساب کاربری، ایمیل خود را وارد کنید</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full text-xs h-8">
                      <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      گیت‌هاب
                    </Button>
                    <Button variant="outline" className="w-full text-xs h-8">
                      <svg className="w-3 h-3 ml-2" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.075C15.0054 18.785 13.6204 19.255 12.0004 19.255C8.8704 19.255 6.21537 17.145 5.2654 14.295L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                      </svg>
                      گوگل
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground text-[10px]">یا ادامه با</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">ایمیل</Label>
                    <Input id="email" placeholder="example@domain.com" type="email" className="h-8 text-xs" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs">رمز عبور</Label>
                    <Input id="password" type="password" className="h-8 text-xs" />
                  </div>
                  
                  <Button className="w-full h-8 text-xs mt-2">ایجاد حساب کاربری</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 