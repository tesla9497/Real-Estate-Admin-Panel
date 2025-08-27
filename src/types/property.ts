export interface Property {
    id: number;
    property_id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: number;
    type: string;
    status: string;
    builder: string;
    created_at: string;
  }
  
  export interface PropertiesTableProps {
    data: Property[];
  }