import { db } from "@/lib/db";

export const UsersData = async (email) => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                role: "USER",
                status: "ACTIVE",
                ...(email && { email: { not: email } })
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
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

export const AdminData = async (email) => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                status: "ACTIVE",
                role: "ADMIN",
                ...(email && { email: { not: email } })
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
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

export const DisabledData = async (email) => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                status: "DISABLED",
                ...(email && { email: { not: email } })
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
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

export const ActiveAccounts = async (email) => {
    try {
        const UsersData = await db.user.findMany({
            where:{
                status: "ACTIVE",
                ...(email && { email: { not: email } })
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
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

export const TotalTranslationCount = async () => {
    try {
        const TranslationData = await db.Translation.findMany();
        
        return TranslationData;
    } catch (error) {
        return error
    }
}