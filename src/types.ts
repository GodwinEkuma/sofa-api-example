export const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: [Author!]!
    summary: String
    genre: [Genre]
  }
  type Author {
    id: ID!
    firstname: String!
    lastname: String!
    dob: String
  }

  type Genre {
    id: ID!
    name: String!
  }

  input AuthorInput{
    firstname: String!
    lastname: String!
    dob: String
  }

  input BookInput{
    title: String!
    author: String!
    summary: String
    genre: String!
  }

  type Query {
    book(id: ID!): Book
    books: [Book!]
    author(id: ID!): Author
    authors: [Author!]
    genre(id: ID!): Genre
    genres: [Genre!]
  }
  type Mutation {
    addBook(book: BookInput!): Book
    addAuthor(author: AuthorInput!): Author
    addGenre(name: String!): Genre
  }
  type Subscription {
    onBook: Book
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;