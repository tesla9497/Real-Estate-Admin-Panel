"use client";

import React, { useState } from "react";
import { User, Bell, Shield } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import {
  ProfileForm,
  NotificationForm,
  SecurityForm,
} from "@/components/custom/settings";

type SettingsTab = "profile" | "notifications" | "security" | "demo";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSubmit = async (values: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile updated:", values);
    setIsLoading(false);
  };

  const handleNotificationSubmit = async (values: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Notification preferences updated:", values);
    setIsLoading(false);
  };

  const handleSecuritySubmit = async (values: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Security settings updated:", values);
    setIsLoading(false);
  };

  const tabs = [
    {
      id: "profile" as SettingsTab,
      label: "Profile",
      icon: User,
      description: "Manage your personal information and contact details",
    },
    {
      id: "notifications" as SettingsTab,
      label: "Notifications",
      icon: Bell,
      description: "Configure your notification preferences",
    },
    {
      id: "security" as SettingsTab,
      label: "Security",
      icon: Shield,
      description: "Update password and security settings",
    },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileForm
            onSubmit={handleProfileSubmit}
            onCancel={() => {}}
            isLoading={isLoading}
            initialValues={{
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@example.com",
              phone: "+1 (555) 123-4567",
              profileImage: null,
            }}
          />
        );
      case "notifications":
        return (
          <NotificationForm
            onSubmit={handleNotificationSubmit}
            onCancel={() => {}}
            isLoading={isLoading}
          />
        );
      case "security":
        return (
          <SecurityForm
            onSubmit={handleSecuritySubmit}
            onCancel={() => {}}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout title="Settings">
      <div className="p-2 space-y-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-3 sm:px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0
                    ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600 mt-1">
              {tabs.find((tab) => tab.id === activeTab)?.description}
            </p>
          </div>

          <div className="max-w-2xl">{renderActiveTab()}</div>
        </div>
      </div>
    </MainLayout>
  );
}
