export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
}

export interface AgentsTableProps {
  data: Agent[];
}
