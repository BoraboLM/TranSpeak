import { db } from "@/lib/db";

export const UsersData = async () => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                role: "USER",
                status: "ACTIVE"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                nationality: true,
                role: true,
                status: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                id: "desc"
            }
        });
        
        return UsersData;
    } catch (error) {
        return error
    }
}

export const AdminData = async () => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                status: "ACTIVE",
                role: "ADMIN"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                nationality: true,
                role: true,
                emailVerified: true,
                status: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                id: "desc"
            }
        });
        
        return UsersData;
    } catch (error) {
        return error
    }
}

export const DisabledData = async () => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                status: "DISABLED"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                nationality: true,
                role: true,
                status: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                id: "desc"
            }
        });
        
        return UsersData;
    } catch (error) {
        return error
    }
}

export const ActiveAccounts = async () => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                status: "ACTIVE"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                nationality: true,
                role: true,
                status: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                id: "desc"
            }
        });
        
        return UsersData;
    } catch (error) {
        return error
    }
}

export const TotalAccounts = async () => {
    try {
        const UsersData = await db.user.findMany({
        });
        
        return UsersData;
    } catch (error) {
        return error
    }
}