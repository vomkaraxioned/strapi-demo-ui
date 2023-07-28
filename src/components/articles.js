export const Articles = ({articlesData})=> {

    const articles = articlesData.data;
    return(
       {
        articles.map((article)=>
            <div className=""></>
        )
       }
    )
}