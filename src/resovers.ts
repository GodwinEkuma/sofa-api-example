import { books, authors, genres } from './data';
import Chance from 'chance';
const chance = new Chance();
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const BOOK_ADDED = 'BOOK_ADDED';

export const resolvers = {
  Query: {
    book(_: any, { id }: any){
      return books.find(book => book.id === id)
    },
    books(){
      return books
    },
    author(_: any, { id }: any){
      return authors.find( author => author.id === id)
    },
    authors(){
      return authors;
    },
    genre(_: any, { id }: any){
      genres.find( genre => genre.id === id);
    },
    genres(){
      return genres
    }
  },
  Mutation: {
    addBook(_: any, { book: bookInput}: any) {
      const book = {...bookInput, id: chance.guid()}
      books.push(book)
      pubsub.publish(BOOK_ADDED, { onBook: book });
    },
    addAuthor(_: any, {author: authorInput}: any) {
      const author = {...authorInput, id: chance.guid()};
      authors.push(author);
      return author;
    },
    addGenre(_: any, name: string) {
      const genre = {name, id: chance.guid()};
      genres.push(genre);
      return genre;
    },
  },
  Subscription: {
    onBook: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
}