export interface User {
    id?: string; // UUID gerado automaticamente
    name: string;
    email: string;
    createdAt?: Date; // também gerado automaticamente
}
