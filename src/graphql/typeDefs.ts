import { gql} from "apollo-server-express";

// The GraphQL schema in string form
const typeDefs = gql`
type Query { books: [Book] }
type Book { title: String, author: String }
`;

export default typeDefs;