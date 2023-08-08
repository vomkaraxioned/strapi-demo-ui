import { Articles } from "../../components/articles";
import { gql, GraphQLClient, request } from "graphql-request";

export const query = gql`
  query ($publication: PublicationState = LIVE) {
    articles(publicationState: $publication) {
      data {
        attributes {
          Title
          Description
          Bannner {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
          author {
            data {
              id
              attributes {
                Name
                Image {
                  data {
                    attributes {
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
`;

const Strapi = async ({ searchParams }) => {
  const { preview, secret } = searchParams;
  const publication =
    preview && secret === process.env.STRAPI_PREVIEW_SECRET
      ? "PREVIEW"
      : "LIVE";
  const endpoint = process.env.STRAPI_API_URL;
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  const data = await graphQLClient.request(query, { publication });

  return (
    <div className="w-4/5 mx-auto">
      <Articles
        articlesData={data.articles.data}
        cmsName="strapi"
        preview={preview}
      />
    </div>
  );
};

export default Strapi;
