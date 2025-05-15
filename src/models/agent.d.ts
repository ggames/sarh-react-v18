export enum DocumentType { DNI, PASAPORTE, CE, CI, LE }

export interface Agent {
    firstname: string;
    lastname: string;
    documenttype?: (typeof DocumentType)[number];
    document: string;
    birthdate: string;
    leavingdate?: string;
    isdeceased: boolean;
    file: string;
    address: string;
    phone: string;
    email: string;     
}

export interface AgentWithId extends Agent {
    id: string;
}