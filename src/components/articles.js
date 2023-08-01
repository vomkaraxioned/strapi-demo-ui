import Link from "next/link";
import Image from "next/image";

export const Articles = ({articlesData,cmsName})=> {

    const articles = articlesData;
    console.log(articles)
        return(
            <div className={`flex ${articles.length > 1 ?"justify-between":"justify-center"} py-10`}>
                 {
                articles?.map((obj,i)=> {
                    return(
                        <figure className={`relative border-[1px] border-slate-500 ${articles.length > 1 ? "basis-[48%]" : "basis-3/4"}`} key={i}>
                           <Link href= {`/blog?cms=${cmsName}&id=${i}`} title={cmsName === "directus" ?obj?.title : obj.attributes.Title}>
                           <Image src={cmsName === "directus" ? "http://15.206.88.50:8055/assets/7512e522-ad0d-4264-92c1-5712a1223d2a" : "/loading.jpg"} alt={obj?.title} width={100} height={100}
                           className="w-full h-auto"
                           />
                           <figcaption className="absolute top-0 w-full px-1 text-white bg-slate-600 bg-opacity-60 py-2">{
                            cmsName === "directus" ?obj?.title : obj.attributes.Title
                            }</figcaption>
                           </Link>
                        </figure>
                    )
                })
            }

            </div>
    )
}