import { MAX_FREE_COUNTS } from '@/constants';
import {auth} from '@clerk/nextjs/server';

const {db}=require('@vercel/postgres');

export const checkIfUserOnboard=async()=>{
    try {
        const client=await db.connect();

        const {userId}=auth();

        if(!userId) return; 

        const user=await client.sql`
        select * 
        from users as u 
        where u.userId = ${userId}; 
        `

        console.log("user form check if user onboard ",user)

        if(!user.rows.length){
            console.log("must correct")
            return false;
        }
        return true;
        
    } catch (error) {
        console.log("error: ",error);
        throw error;
    }
}

export const increaseApiLimit=async()=>{
    try {
        const client=await db.connect();

        const {userId}=auth();

        if(!userId) return; 

        const user=await client.sql`
        select * 
        from users as u 
        where u.userId = ${userId}; 
        `

        console.log("result increase: ",user);

        if(!user.rows.length){
            console.log("i am adding user")
            await client.sql`
            INSERT INTO users (userId,count)
        VALUES (${userId},1);
            `
            console.log("successfully inserted user")
        }
        else{
            console.log("go here to update")

            await client.sql`
            update users
            set count=${user.rows[0].count+1}
            where userId=${userId};
            `
            console.log("successfully update user");
        }
        
    } catch (error) {
        console.log("error: ",error);
        throw error;
    }
}

export const checkExceedApiLimit=async ()=>{
    try {
        const client=await db.connect();

        const {userId}=auth();

        console.log("I am inside check api")

        const count=await client.sql`
        select count
        from users as u 
        where u.userId = ${userId}; 
        `

        console.log("count increase",count)

        if(count.rows[0].count>=MAX_FREE_COUNTS){
            return true;
        }
        return false;

    } catch (error) {
        console.log("error: ",error);
        throw error;
    }
}

export const showCountLimit=async()=>{
    try {
        const client=await db.connect();

        if(!(await checkIfUserOnboard())){
            return 0;
        }

        const {userId}=auth();

        const user=await client.sql`
        select * 
        from users as u 
        where u.userId = ${userId}; 
        `

        console.log("result increase: ",user);

        return user.rows[0].count;
    } catch (error) {
        console.log("error: ",error);
        throw error;
    }
}



