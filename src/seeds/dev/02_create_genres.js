/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('genres').del();
  await knex('genres').insert([
    { title: 'Fantasy', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264398/fantasy_h4wdlt.jpg' },
    { title: 'Science Fiction', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264401/science_fiction_pqmnol.jpg' },
    { title: 'Mystery', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264400/mistery_yp5p6r.jpg' },
    { title: 'Thriller', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264401/thriller_bmhmdg.jpg' },
    { title: 'Romance', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264400/romance_g6wa45.jpg' },
    { title: 'Horror', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264399/horror_kzpmkh.jpg' },
    { title: 'Historical Fiction', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264398/historical_bmaakf.jpg' },
    { title: 'Young Adult', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264402/young_adult_mflbe0.jpg'},
    { title: 'Classics', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264398/classics_vkoath.jpg' },
    { title: 'Adventure', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719264398/adventure_s3wqrv.jpg' },
  ]);
};
