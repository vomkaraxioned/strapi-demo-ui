const Blog = async(req,res)=> {

    const {searchParams} = req;
    const {id,cms} = searchParams;
    const response = await fetch(cms=== "directus" ? process.env.DIRECTUS_API_URL : process.env.STRAPI_API_URL,{
        headers:{
            Authorization: "bearer" + process.env.STRAPI_API_TOKEN,
        },
    })
    const data = await response.json();
    const result =cms === "directus" ?  data.data?.filter(obj=>obj.status === "published") : data.data;
    const description =  cms === "directus" ? result[id].description.blocks[1].data.text: result[id]?.attributes.Description;

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
