import React from "react";
import { Users, DollarSign, Home, TrendingUp } from "lucide-react";
import { SummaryCard } from "@/components/custom/common";
import { DashboardCharts } from "@/components/custom/dashboard";
import { MainLayout } from "@/components/layout/main-layout";

export default function DashboardPage() {
  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6 p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Properties"
            value="1,234"
            icon={Home}
            description="Active listings"
            trend={{ value: 12, isPositive: true }}
            iconClassName="text-amber-500"
            color="bg-amber-50"
          />

          <SummaryCard
            title="Total Agents"
            value="89"
            icon={Users}
            description="Registered agents"
            trend={{ value: 5, isPositive: true }}
            iconClassName="text-blue-500"
            color="bg-blue-50"
          />

          <SummaryCard
            title="Revenue"
            value="$2.4M"
            icon={DollarSign}
            description="This year"
            trend={{ value: 8, isPositive: true }}
            iconClassName="text-green-500"
            color="bg-green-50"
          />

          <SummaryCard
            title="Growth Rate"
            value="+15%"
            icon={TrendingUp}
            description="vs last year"
            trend={{ value: 3, isPositive: true }}
            iconClassName="text-purple-500"
            color="bg-purple-50"
          />
        </div>

        {/* Charts and Activity */}
        <DashboardCharts />
      </div>
    </MainLayout>
  );
}
