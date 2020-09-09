import Chance from 'chance';
const chance = new Chance();

export const authors = generateAuthors()
export const genres = generateGenres()
export const books = generateBooks();

export function generateAuthors(length = 5) {
  return new Array(length).fill(null).map(() => {
    return {
      id: chance.guid(),
      firstname: chance.first(),
      lastname: chance.first(),
      dob: chance.birthday({ string: true })
    };
  });
}

export function generateGenres(length = 5) {
  return new Array(length).fill(null).map(() => {
    return {
      id: chance.guid(),
      name: chance.word()
    };
  });
}

export function generateBooks(length = 10) {
  return new Array(length).fill(null).map(() => {
    return {
      id: chance.guid(),
      title: chance.sentence({ words: 5 }),
      author: chance.pickset(authors, 1),
      summary: chance.sentence(),
      genre: chance.pickset(genres, 2)
    };
  });
}