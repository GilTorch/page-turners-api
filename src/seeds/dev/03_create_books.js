/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('books').del();

  const genres = await knex('genres').select('id', 'title');

  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.title] = genre.id;
    return acc;
  }, {});


  const books = [
    { title: 'Harry Potter and the Sorcerer\'s Stone', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/foundation_e7vhdn.jpg', author: 'J.K. Rowling', genre: 'Fantasy' },
    { title: 'A Game of Thrones', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/a_game_of_thrones_bptenv.jpg', author: 'George R.R. Martin', genre: 'Fantasy' },
    { title: 'The Hobbit', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287909/the_hobbit_ffhdzl.jpg', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { title: 'Dune', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/dune_sochwo.jpg', author: 'Frank Herbert', genre: 'Science Fiction' },
    { title: 'Foundation', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/foundation_e7vhdn.jpg', author: 'Isaac Asimov', genre: 'Science Fiction' },
    { title: 'Murder on the Orient Express', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287903/murder_on_the_orient_express_zw46ge.jpg', author: 'Agatha Christie', genre: 'Mystery' },
    { title: 'The Da Vinci Code', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_da_vinci_code_jemqbr.jpg', author: 'Dan Brown', genre: 'Thriller' },
    { title: 'Pride and Prejudice', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287903/pride_and_prejudice_lf5veb.jpg', author: 'Jane Austen', genre: 'Romance' },
    { title: 'Dracula', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/dracula_s9qalb.jpg', author: 'Bram Stoker', genre: 'Horror' },
    { title: 'The Shining', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/the_shining_jwe5sk.jpg', author: 'Stephen King', genre: 'Horror' },
    { title: 'The Book Thief', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_brothers_karamazov_m3grfm.jpg',author: 'Markus Zusak', genre: 'Historical Fiction' },
    { title: 'The Hunger Games', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287911/the_hunger_games_j7lz3i.jpg', author: 'Suzanne Collins', genre: 'Young Adult' },
    { title: 'To Kill a Mockingbird', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/to_kill_a_mocking_bird_gsdikk.jpg', author: 'Harper Lee', genre: 'Classics' },
    { title: '1984', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287895/1984_qftc3y.jpg', author: 'George Orwell', genre: 'Classics' },
    { title: 'The Adventures of Huckleberry Finn', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287904/the_adventures_of_huckleberry_fin_jtxfwr.jpg', author: 'Mark Twain', genre: 'Classics' },
    { title: 'The Catcher in the Rye', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287901/j_d_salinger_ypnhxm.jpg', author: 'J.D. Salinger', genre: 'Classics' },
    { title: 'The Great Gatsby', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_great_gasby_nowwib.jpg', author: 'F. Scott Fitzgerald', genre: 'Classics' },
    { title: 'Gone Girl', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287901/gone_girl_a1rut4.jpg', author: 'Gillian Flynn', genre: 'Thriller' },
    { title: 'The Road', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/the_road_kifyib.jpg',author: 'Cormac McCarthy', genre: 'Science Fiction' },
    { title: 'Ender\'s Game', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/enders_game_ckilil.jpg', author: 'Orson Scott Card', genre: 'Science Fiction' },
    { title: 'The Martian', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287912/the_martian_f9rbyo.jpg', author: 'Andy Weir', genre: 'Science Fiction' },
    { title: 'Brave New World', cover:'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/brave_new_world_rpnf1c.jpg', author: 'Aldous Huxley', genre: 'Science Fiction' },
    { title: 'Fahrenheit 451', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/farenheit_451_ko3byh.jpg', author: 'Ray Bradbury', genre: 'Science Fiction' },
    { title: 'Catch-22', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/catch_22_dmprtt.jpg', author: 'Joseph Heller', genre: 'Classics' },
    { title: 'The Hitchhiker\'s Guide to the Galaxy', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_hitchhikers_guide_to_the_galaxy_mbyoar.jpg', author: 'Douglas Adams', genre: 'Science Fiction' },
    { title: 'The Name of the Wind', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287913/the_name_of_the_wind_xdivwr.jpg', author: 'Patrick Rothfuss', genre: 'Fantasy' },
    { title: 'The Lies of Locke Lamora', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287911/the_lies_of_locke_lamora_kmqtrk.jpg', author: 'Scott Lynch', genre: 'Fantasy' },
    { title: 'The Girl with the Dragon Tattoo', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_girl_with_dragon_tattoo_h2kldj.jpg', author: 'Stieg Larsson', genre: 'Mystery' },
    { title: 'The Time Machine', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/the_time_machine_f8h7e6.jpg', author: 'H.G. Wells', genre: 'Science Fiction' },
    { title: 'Sherlock Holmes: The Complete Novels and Stories', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287904/sherlock_holmes_the_complete_novels_and_stories_lv9ogu.jpg', author: 'Arthur Conan Doyle', genre: 'Mystery' },
    { title: 'Life of Pi', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287903/life_of_pi_gnnt8c.jpg', author: 'Yann Martel', genre: 'Adventure' },
    { title: 'The Alchemist', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_alchemist_iia2uh.jpg', author: 'Paulo Coelho', genre: 'Adventure' },
    { title: 'The Little Prince', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/antoine_de_st_exupery_ujjysc.jpg', author: 'Antoine de Saint-Exupéry', genre: 'Classics' },
    { title: 'Animal Farm', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/animal_farm_dj9o07.jpg', author: 'George Orwell', genre: 'Classics' },
    { title: 'Lord of the Flies',cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287903/lord_of_the_flies_c83rdw.jpg', author: 'William Golding', genre: 'Classics' },
    { title: 'Of Mice and Men', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287903/of_mice_and_men_sdzuuw.jpg', author: 'John Steinbeck', genre: 'Classics' },
    { title: 'The Picture of Dorian Gray',cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287913/the_picture_of_dorian_gray_rgh8qx.jpg', author: 'Oscar Wilde', genre: 'Classics' },
    { title: 'Frankenstein', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/frankenstein_wr6l88.jpg',  author: 'Mary Shelley', genre: 'Horror' },
    { title: 'Wuthering Heights', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/wuthering_heights_yw3veu.jpg', author: 'Emily Brontë', genre: 'Classics' },
    { title: 'Jane Eyre', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287902/jane_eyre_czzeko.jpg', author: 'Charlotte Brontë', genre: 'Classics' },
    { title: 'Crime and Punishment', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287895/crime_and_punishment_skxiwk.jpg', author: 'Fyodor Dostoevsky', genre: 'Classics' },
    { title: 'War and Peace', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/war_and_peace_a4wvs0.jpg', author: 'Leo Tolstoy', genre: 'Classics' },
    { title: 'Les Misérables', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287902/les_miserables_cu9s7t.jpg', author: 'Victor Hugo', genre: 'Classics' },
    { title: 'Don Quixote', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287896/don_quixote_t3v9qu.jpg', author: 'Miguel de Cervantes', genre: 'Classics' },
    { title: 'The Odyssey', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287913/the_picture_of_dorian_gray_rgh8qx.jpg', author: 'Homer', genre: 'Classics' },
    { title: 'The Iliad', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287911/the_iliad_pzmpgg.jpg', author: 'Homer', genre: 'Classics' },
    { title: 'The Divine Comedy', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719289010/the_divine_comedy_nfhern.jpg', author: 'Dante Alighieri', genre: 'Classics' },
    { title: 'The Prince', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287915/the_prince_ndekdi.jpg', author: 'Niccolò Machiavelli', genre: 'Classics' },
    { title: 'The Brothers Karamazov', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287907/the_brothers_karamazov_m3grfm.jpg', author: 'Fyodor Dostoevsky', genre: 'Classics' },
    { title: 'One Hundred Years of Solitude', cover: 'https://res.cloudinary.com/gilbert-torchon/image/upload/v1719287903/one_hundred_years_of_solitude_vfyci7.jpg', author: 'Gabriel García Márquez', genre: 'Classics' },
  ];


  const booksData = books.map((book, index) => ({
    author_id: null, // Assuming none of the authors are users in this example
    genre_id: genreMap[book.genre],
    price: (Math.random() * 100).toFixed(2),
    cover: book.cover,
    stock_quantity: Math.floor(Math.random() * 100),
    description: `This is the description for ${book.title}.`,
    author: book.author,
    status: Math.random() < 0.5 ? 'ACTIVE' : 'OUT_OF_STOCK',
  }));

  await knex('books').insert(booksData);
};