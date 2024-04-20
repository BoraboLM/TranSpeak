// const { PrismaClient } = "@prisma/client"

// const prismaClientSingleton = () => {
//     return new PrismaClient()
// }

// if (typeof global.prismaGlobal === 'undefined') {
//     global.prismaGlobal = prismaClientSingleton()
// }

// export const db = global.prismaGlobal


// if (process.env.NODE_ENV !== 'production') global.prismaGlobal = db

const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
    return new PrismaClient();
}

if (typeof global.prismaGlobal === 'undefined') {
    global.prismaGlobal = prismaClientSingleton();
}

export const db = global.prismaGlobal;

if (process.env.NODE_ENV !== 'production') global.prismaGlobal = db;
