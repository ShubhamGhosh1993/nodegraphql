import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";
// Query Schema
const typeDefs = gql`
  type Query {
    greet: String
    users_count: Int
    users: [Users]
    iquote(created_by: ID!): [Quotes]
    quotes: [Quotes]
    user(id: ID!): Users
  }

  type Users {
    id: ID!
    firstname: String
    lastname: String
    email: String
    password: String
    quotes: [Quotes]
  }

  type Quotes {
    quote: String
    created_by: ID!
  }
`;
// Resolvers
const resolvers = {
  Query: {
    greet: () => "Hello World!",
    users_count: () => 56,
    user: (_, args) => users.find((user) => user.id == args.id),
    users: () => users,
    quotes: () => quotes,
    iquote: (_, args) =>
      quotes.filter((quote) => quote.created_by == args.created_by),
    //   quotes.filter((quote) => {console.log(quote)}),
  },
  Users: {
    quotes: (user) => quotes.filter((q) => q.created_by == user.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(4000).then(({ url }) => {
  console.log(`Server is on ${url}`);
});
