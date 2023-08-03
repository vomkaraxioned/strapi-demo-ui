import {query} from "../strapi/page";
import { gql, GraphQLClient,request } from 'graphql-request';

const Blog = async(req,res)=> {

    const endpoint = process.env.STRAPI_API_URL;

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization:`bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    })
    
    const getString = (arr)=> {
        let str = "";
        arr?.blocks.map((obj)=>{
            str += obj.data.text 
        });
        return str
    }

    const {searchParams} = req;
    const {id,cms} = searchParams;
    const response = await fetch(cms=== "directus" ? process.env.DIRECTUS_API_URL : process.env.STRAPI_API_URL,{
        headers:{
            Authorization: "bearer" + process.env.STRAPI_API_TOKEN,
        },
    })
    const data =cms === "directus" ?  await response.json() : await graphQLClient.request(query);
    const result =cms === "directus" ?  data.data?.filter(obj=>obj.status === "published") : data.articles.data;
    const description =  cms === "directus" ? getString(result[id].description): result[id]?.attributes.Description;
    console.log(description)
    return (
        <div className="w-4/5 mx-auto">
         {  
         <section>
            <h2 className="text-center text-2xl py-2 font-bold">{cms === "directus" ?  result[id]?.title : result[id]?.attributes.Title}</h2>
            <div
            dangerouslySetInnerHTML={{__html:description}}
            />
         </section>
            
         }
        </div>
    )
} 

export default Blog;
