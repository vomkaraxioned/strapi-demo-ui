import { Articles } from "../../components/articles";

 const Strapi = async()=> {

    const response =await fetch(process.env.STRAPI_API_URL,{
        headers:{
            Authorization: "bearer" + process.env.STRAPI_API_TOKEN,
        },
    })
    
    const data = await response.json();
    return(
        <div className="w-4/5 mx-auto">
            <Articles articlesData={data.data} cmsName="strapi"/>
        </div>
    )
}

export default Strapi;
