export interface TableItem {
    name: string;
    status: string;
  }
  
  export interface TableData {
    title: string;
    description: string;
    textColor: string;
    bgColor: string;
    items: TableItem[];
  }
  
  export interface ProjectData {
    id: string;
    name: string;
    description: string;
    image?: string;
    textColor: string;
    tables?: TableData[];
  }