"use client";

import React from "react";
import {
  Users,
  DollarSign,
  TrendingUp,
  Building2,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function DashboardCharts() {
  // Mock data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, properties: 12, agents: 8 },
    { month: "Feb", revenue: 52000, properties: 15, agents: 9 },
    { month: "Mar", revenue: 48000, properties: 13, agents: 8 },
    { month: "Apr", revenue: 61000, properties: 18, agents: 10 },
    { month: "May", revenue: 55000, properties: 16, agents: 9 },
    { month: "Jun", revenue: 68000, properties: 20, agents: 11 },
    { month: "Jul", revenue: 72000, properties: 22, agents: 12 },
    { month: "Aug", revenue: 65000, properties: 19, agents: 10 },
    { month: "Sep", revenue: 58000, properties: 17, agents: 9 },
    { month: "Oct", revenue: 63000, properties: 18, agents: 10 },
    { month: "Nov", revenue: 59000, properties: 17, agents: 9 },
    { month: "Dec", revenue: 71000, properties: 21, agents: 11 },
  ];

  const propertyTypes = [
    { name: "Apartments", value: 45, color: "#8884d8" },
    { name: "Houses", value: 30, color: "#82ca9d" },
    { name: "Condos", value: 15, color: "#ffc658" },
    { name: "Townhouses", value: 10, color: "#ff7300" },
  ];

  const agentPerformance = [
    { name: "Sarah Johnson", sales: 12, rating: 4.8 },
    { name: "Mike Chen", sales: 10, rating: 4.6 },
    { name: "Emily Davis", sales: 9, rating: 4.9 },
    { name: "David Wilson", sales: 8, rating: 4.7 },
    { name: "Lisa Brown", sales: 7, rating: 4.5 },
  ];

  return (
    <>
      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelFormatter={(label) => `${label}uary`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Property Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propertyTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} properties`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Properties vs Agents Trend */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Properties & Agents Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="properties"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="agents"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
