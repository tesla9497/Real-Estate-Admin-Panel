"use client";
import { useState, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import {
  AgentsTable,
  ActionBar,
  AddAgentForm,
} from "@/components/custom/agents";
import { Button, Modal } from "@/components/ui";
import { useDebounce } from "@/hooks";

import agentsData from "@/data/agents.json";
import { Agent } from "@/types/agent";

export default function AgentsPage() {
  const [searchAgent, setSearchAgent] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const debouncedSearchAgent = useDebounce(searchAgent, 300);

  const uniqueRoles = useMemo(() => {
    const roles = [...new Set(agentsData.map((a) => a.role))];
    return roles.map((role) => ({
      value: role,
      label: role,
    }));
  }, []);

  const filteredAgents = useMemo(() => {
    return agentsData.filter((a) => {
      const matchesSearch =
        !debouncedSearchAgent ||
        a.name.toLowerCase().includes(debouncedSearchAgent.toLowerCase()) ||
        a.email.toLowerCase().includes(debouncedSearchAgent.toLowerCase());
      const matchesRole = !selectedRole || a.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [debouncedSearchAgent, selectedRole]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchAgent(value);
  }, []);

  const handleRoleChange = useCallback((role: string) => {
    setSelectedRole(role);
  }, []);

  const handleAddAgent = useCallback(
    async (agentData: Omit<Agent, "id" | "created_at">) => {
      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Adding new agent:", agentData);
        setIsAddModalOpen(false);
      } catch (error) {
        console.error("Error adding agent:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const openAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const closeAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  return (
    <MainLayout title="Agents Management">
      <div className="space-y-6">
        <div className="flex flex-wrap flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <Button
            className="bg-primary text-white px-6 py-2"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Agent
          </Button>
          <ActionBar
            uniqueRoles={uniqueRoles}
            searchAgent={searchAgent}
            setSearchAgent={handleSearchChange}
            selectedRole={selectedRole}
            setSelectedRole={handleRoleChange}
          />
        </div>

        {/* Agents Table */}
        <AgentsTable data={filteredAgents} />

        {/* Add Agent Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title="Add New Agent"
        >
          <AddAgentForm
            onSubmit={handleAddAgent}
            onCancel={closeAddModal}
            isLoading={isSubmitting}
          />
        </Modal>
      </div>
    </MainLayout>
  );
}
