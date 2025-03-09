'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
  ChartOptions,
} from 'chart.js';
import Sidebar from '@/components/Sidebar';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, Area, AreaChart, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import dynamic from 'next/dynamic';
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import { BrowserChart } from "@/components/ui/browser-chart";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartJSTooltip,
  ChartJSLegend
);

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [moveGoal, setMoveGoal] = useState(350);
  const [timeRange, setTimeRange] = useState("90d");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample data for the revenue chart
  const revenueData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'],
    datasets: [
      {
        data: [320000000, 380000000, 360000000, 400000000, 420000000, 440000000, 456000000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Sample data for new customers
  const subscriptionsData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [
      {
        data: [1800, 2350, 2100, 2200, 1900, 2000, 2300, 2350],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgb(59, 130, 246)',
        barThickness: 20,
      },
    ],
  };

  // Sample data for sales goals
  const exerciseData = {
    labels: Array.from({ length: 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'این ماه',
        data: [300, 250, 350, 450, 400, 350, 300, 450, 350, 400, 350, 300],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'ماه گذشته',
        data: [250, 200, 300, 350, 250, 300, 250, 300, 250, 350, 300, 250],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  const revenueChartConfig = {
    type: 'line',
    data: revenueData,
    options: {
    plugins: {
      legend: {
        display: false,
      },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw as number;
              return `${value.toLocaleString('fa-IR')} تومان`;
            },
          },
        },
    },
    scales: {
      x: {
        grid: {
          display: false,
          },
          ticks: {
            font: {
              family: 'Vazirmatn',
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: any) => {
              return `${(value as number).toLocaleString('fa-IR')}`;
            },
            font: {
              family: 'Vazirmatn',
            },
          },
        },
      },
    },
  } as ChartOptions<'line'>;

  const subscriptionsChartConfig = {
    type: 'bar',
    data: subscriptionsData,
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw as number;
              return `${value.toLocaleString('fa-IR')} مشتری`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: 'Vazirmatn',
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: any) => {
              return `${(value as number).toLocaleString('fa-IR')}`;
            },
            font: {
              family: 'Vazirmatn',
            },
          },
        },
      },
    },
  } as ChartOptions<'line'>;

  const exerciseChartConfig = {
    type: 'line',
    data: exerciseData,
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            font: {
              family: 'Vazirmatn',
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw as number;
              return `${value.toLocaleString('fa-IR')} میلیون تومان`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: 'Vazirmatn',
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: any) => {
              return `${(value as number).toLocaleString('fa-IR')}`;
            },
            font: {
              family: 'Vazirmatn',
            },
          },
        },
      },
    },
  } as ChartOptions<'line'>;

  const timeOptions = [
    { value: "1d", label: "۲۴ ساعت گذشته" },
    { value: "7d", label: "۷ روز گذشته" },
    { value: "30d", label: "۳۰ روز گذشته" },
    { value: "90d", label: "۹۰ روز گذشته" },
  ];

  const [selectedTime, setSelectedTime] = useState("7d");

  // Sample team members data
  const teamMembers = [
    { name: 'علی محمدی', email: 'ali@example.com', role: 'Owner' },
    { name: 'سارا احمدی', email: 'sara@example.com', role: 'Member' },
    { name: 'محمد حسینی', email: 'mohammad@example.com', role: 'Member' },
  ];

  // Sample browser data for chart
  const browserData = [
    { name: 'اینستاگرام', value: 4344 },
    { name: 'گوگل', value: 5435 },
    { name: 'تبلیغات کلیکی', value: 3452 },
    { name: 'تبلیغات بنری', value: 2342 },
    { name: 'ایمیل مارکتینگ', value: 1231 },
  ];

  // Configure area chart
  const areaChartData = [
    { name: '۱', desktop: 63, mobile: 28 },
    { name: '۲', desktop: 80, mobile: 40 },
    { name: '۳', desktop: 67, mobile: 45 },
    { name: '۴', desktop: 87, mobile: 50 },
    { name: '۵', desktop: 75, mobile: 30 },
    { name: '۶', desktop: 68, mobile: 54 },
    { name: '۷', desktop: 94, mobile: 47 },
  ];

  // Configure messages
  const messages = [
    {
      id: 1,
      name: 'رضا کریمی',
      avatar: '/avatars/01.png',
      message: 'آیا می‌توانیم جلسه را به ساعت ۴ موکول کنیم؟',
      timestamp: 'همین الان',
    },
    {
      id: 2,
      name: 'مریم عباسی',
      avatar: '/avatars/02.png',
      message: 'گزارش فروش هفتگی آماده است.',
      timestamp: '۲ دقیقه پیش',
    },
    {
      id: 3,
      name: 'احمد محمدی',
      avatar: '/avatars/03.png',
      message: 'سفارش جدید از مشتری ویژه داریم. لطفا بررسی کنید.',
      timestamp: '۵ دقیقه پیش',
    },
    {
      id: 4,
      name: 'زهرا احمدی',
      avatar: '/avatars/04.png',
      message: 'قرارداد جدید آماده امضا است.',
      timestamp: '۱۰ دقیقه پیش',
    },
    {
      id: 5,
      name: 'علی حسینی',
      avatar: '/avatars/05.png',
      message: 'نمونه محصول جدید رسیده است.',
      timestamp: '۱۵ دقیقه پیش',
    },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: 'سفارش جدید',
      description: 'سفارش جدید از مشتری شماره #۴۵۸۲۳ دریافت شد.',
      time: '۱۰ دقیقه پیش',
      isRead: false,
      type: 'order'
    },
    {
      id: 2,
      title: 'پرداخت موفق',
      description: 'پرداخت فاکتور #۲۳۴۵ با موفقیت انجام شد.',
      time: '۳۰ دقیقه پیش',
      isRead: true,
      type: 'payment'
    },
    {
      id: 3,
      title: 'موجودی کم',
      description: 'موجودی محصول "هدفون بی سیم" رو به اتمام است.',
      time: '۱ ساعت پیش',
      isRead: false,
      type: 'inventory'
    },
  ];

  const renderAreaChart = () => {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={areaChartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-muted-foreground">
                          دسکتاپ
                        </span>
                        <span className="font-bold text-foreground">
                          {payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-muted-foreground">
                          موبایل
                        </span>
                        <span className="font-bold text-foreground">
                          {payload[1].value}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="desktop"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#colorDesktop)"
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="mobile"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            fill="url(#colorMobile)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart 
          data={[
            { name: "فروردین", total: 1200 },
            { name: "اردیبهشت", total: 750 },
            { name: "خرداد", total: 890 },
            { name: "تیر", total: 950 },
            { name: "مرداد", total: 1450 },
            { name: "شهریور", total: 1650 },
          ]}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickMargin={8}
          />
          <Bar 
            dataKey="total" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            activeBar={<Rectangle fill="hsl(var(--primary))" opacity={0.8} />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Configuration for browser chart
  const browserChartData = {
    labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    datasets: [
      {
        data: [4344, 5435, 1443, 4443, 2443],
        backgroundColor: [
          '#0f172a',
          '#334155',
          '#475569',
          '#64748b',
          '#94a3b8',
        ],
        hoverBackgroundColor: [
          '#0f172a',
          '#334155',
          '#475569',
          '#64748b',
          '#94a3b8',
        ],
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const formattedBrowserChartData = [
    { browser: 'Chrome', visitors: 4344, fill: '#0f172a' },
    { browser: 'Firefox', visitors: 5435, fill: '#334155' },
    { browser: 'Safari', visitors: 1443, fill: '#475569' },
    { browser: 'Edge', visitors: 4443, fill: '#64748b' },
    { browser: 'Opera', visitors: 2443, fill: '#94a3b8' },
  ];

  const browserChartConfig: ChartConfig & { visitors: { label: string } } = {
    visitors: {
      label: "Visitors"
    },
    type: {
      label: 'doughnut',
      color: '#0f172a'
    },
    options: {
      label: 'Options',
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            boxWidth: 10,
            boxHeight: 10,
            font: {
              family: 'Vazirmatn',
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw;
              return `${label}: ${value} بازدید`;
            }
          }
        }
      },
      cutout: '70%',
    },
    data: browserChartData,
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 pl-[var(--sidebar-width)]">
        <div className="p-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-right">داشبورد</CardTitle>
              <CardDescription className="text-right">به داشبورد مدیریت کسب و کار خود خوش آمدید</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-end space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CalendarDateRangePicker align="end" />
                  <Button>دانلود گزارش</Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">درآمد</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">۲۳۵,۷۳۰,۰۰۰</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      +۱۸.۲٪ نسبت به ماه گذشته
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">سفارش‌ها</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-green-500"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+۵۷۳</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      +۲۰.۱٪ نسبت به ماه گذشته
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">محصولات</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+۱۲۸</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      +۱۲.۲٪ نسبت به ماه گذشته
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">بازدیدها</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+۱۷,۴۸۱</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      +۱۰.۸٪ نسبت به ماه گذشته
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4 h-[300px]">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-right">درآمد</CardTitle>
                    <CardDescription className="text-right">۴۵۶,۰۰۰,۰۰۰+ تومان</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px]">
                      <Line data={revenueData} options={revenueChartConfig} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3 h-[300px]">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-right">
                      آمار بازدید سایت
                    </CardTitle>
                    <CardDescription className="text-right">
                      ۷ روز گذشته
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {renderAreaChart()}
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                <Card className="h-[300px]">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-right">مشتریان جدید</CardTitle>
                    <CardDescription className="text-right">۱۸۰.۱٪+ نسبت به ماه گذشته</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-right">+۲,۳۵۰</div>
                    <div className="h-[120px] mt-4">
                      <Line data={subscriptionsData} options={subscriptionsChartConfig} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="h-[300px]">
                  <CardContent className="p-0 h-full flex items-center justify-center">
                    <Calendar
                      dir="rtl"
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="max-w-sm mx-auto"
                      showOutsideDays={false}
                      locale={{
                        localize: {
                          day: n => ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'][n],
                          month: n => ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][n],
                          dayOfWeek: day => ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'][day],
                        },
                        formatLong: {
                          date: () => 'MM/dd/yyyy',
                        },
                      }}
                      components={{
                        IconLeft: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                        IconRight: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                      }}
                    />
                  </CardContent>
                </Card>
                <Card className="h-[300px]">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-right">هدف فروش</CardTitle>
                    <CardDescription className="text-right">هدف فروش ماهانه خود را تنظیم کنید</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setMoveGoal(Math.max(0, moveGoal - 50))}
                      >
                        -
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-4xl font-bold">{moveGoal}</div>
                        <div className="text-sm text-muted-foreground">میلیون تومان</div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setMoveGoal(moveGoal + 50)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="mt-4 h-[100px]">
                      <Line data={exerciseData} options={exerciseChartConfig} />
                    </div>
                    <Button className="w-full mt-4">ثبت هدف</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 h-[300px]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>آمار کانال‌های فروش</CardTitle>
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger className="w-[160px] rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {timeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="rounded-lg text-right"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <CardDescription>
                      فروردین - شهریور ۱۴۰۲
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] w-full">
                      <BrowserChart data={formattedBrowserChartData} config={browserChartConfig} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3 h-[300px]">
                  <CardHeader className="flex flex-row items-center border-b justify-between pb-2">
                    <CardTitle className="text-xl">پیام‌های اخیر</CardTitle>
                    <CardDescription>
                      ۵ پیام جدید
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[240px] px-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-start space-x-4 space-x-reverse py-4">
                          <Avatar>
                            <AvatarImage src={message.avatar} alt={message.name} />
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium leading-none">{message.name}</p>
                              <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="p-4 border-t">
                      <div className="flex space-x-2 space-x-reverse">
                        <Input className="flex-1" placeholder="پیام خود را وارد کنید..." />
                        <Button size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 