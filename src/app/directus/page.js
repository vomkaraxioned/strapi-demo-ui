import { Articles } from "../../components/articles";

const Directus = async ()=> {

    const response =await fetch(process.env.DIRECTUS_API_URL);
    const data = await response.json();

    return (
        <div className="w-4/5 mx-auto">
        <Articles articlesData={data.data?.filter(obj=>obj.status === "published")} cmsName="directus"/>
        </div>
    )
}

export default Directus;
