"use server"

export async function getPost(category:string="", status:string="", sortBy:string="", page:number = 1){
    try{
        const data = await fetch('https://api.escuelajs.co/api/v1/products')
        .then(res=>res.json())
        return data
    }catch(error){
        return{error: error}
    }
}