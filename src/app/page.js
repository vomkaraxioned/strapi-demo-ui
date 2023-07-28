import { Articles } from "../components/articles";

export default async function Home() {

  const response =await fetch(process.env.API_URL,{
    headers:{
        Authorization: "bearer" + process.env.API_TOKEN,
    },
})

const data = await response.json()

  return (
    <main>
      <Articles articlesData={data}/>
    </main>
  )
}
