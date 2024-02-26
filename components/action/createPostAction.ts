"use server"

export async function CreatePostAction(formData:FormData){
    try{
        console.log("Post data",formData)
    }catch(error:unknown){
        throw error;
    }
}