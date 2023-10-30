import { Document } from 'mongoose';

export interface IAnttCache extends Document{
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly message: string;
}