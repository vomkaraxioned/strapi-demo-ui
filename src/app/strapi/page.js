import { Articles } from "../../components/articles";
import { gql, GraphQLClient,request } from 'graphql-request'


export const query = gql`query {
  articles {
    data{
      attributes {
        Title
        Description
        Bannner{
          data{
            id
            attributes{
              name
              url
            }
          }
        }
        author{
          data{
            id
            attributes{
              Name
              Image{
                data{
                  attributes{
                    name
                    url
                  }
                }
              }
              Description
            }
          }
        }
      }
    }
  }
}
  `

 const Strapi = async()=> {

    const endpoint = process.env.STRAPI_API_URL;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization:`bearer ${process.env.STRAPI_API_TOKEN}`,
  },
})

  const data = await graphQLClient.request(query)

    return(
        <div className="w-4/5 mx-auto">
            <Articles articlesData={data.articles.data} cmsName="strapi"/>
        </div>
    )
}

export default Strapi;
