import {ApolloServer,gql} from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
// Query Schema
const typeDefs = gql`
type Query{
    greet: String,
    users_count: Int

}
`
// Resolvers
const resolvers = {
    Query:{
        greet: ()=>"Hello World!",
        users_count: ()=>56
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen(4000).then(({url})=>{
    console.log(`Server is on ${url}`)
});