/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  // P@ssw0rd
  const defaultPassword = '$2b$10$kawA.bXb/wJT9SjBphfjxeqsjp2QeaIZck4rt/pGQHRfJhhG1x57m';

  await knex('users').del()
  await knex('users').insert([
    {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: defaultPassword,
      first_name: 'John',
      last_name: 'Doe',
      gender: 'MALE',
      birthday: '1990-01-01',
      address: {
        address_line1: '123 Main St',
        address_line2: 'Apt 4B',
        city: 'Springfield',
        state: 'IL',
        postal_code: '62701',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'jane_doe',
      email: 'jane.doe@example.com',
      password: defaultPassword,
      first_name: 'Jane',
      last_name: 'Doe',
      gender: 'FEMALE',
      birthday: '1992-02-02',
      address: {
        address_line1: '456 Elm St',
        address_line2: 'Suite 100',
        city: 'Metropolis',
        state: 'NY',
        postal_code: '10001',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'alice_smith',
      email: 'alice.smith@example.com',
      password: defaultPassword,
      first_name: 'Alice',
      last_name: 'Smith',
      gender: 'FEMALE',
      birthday: '1985-03-03',
      address: {
        address_line1: '789 Maple Ave',
        address_line2: '',
        city: 'Gotham',
        state: 'NJ',
        postal_code: '07001',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'bob_jones',
      email: 'bob.jones@example.com',
      password: defaultPassword,
      first_name: 'Bob',
      last_name: 'Jones',
      gender: 'MALE',
      birthday: '1988-04-04',
      address: {
        address_line1: '321 Oak St',
        address_line2: 'Apt 2C',
        city: 'Star City',
        state: 'CA',
        postal_code: '90001',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'charlie_brown',
      email: 'charlie.brown@example.com',
      password: defaultPassword,
      first_name: 'Charlie',
      last_name: 'Brown',
      gender: 'MALE',
      birthday: '1995-05-05',
      address: {
        address_line1: '654 Pine St',
        address_line2: 'Apt 5D',
        city: 'Central City',
        state: 'TX',
        postal_code: '75001',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'diana_prince',
      email: 'diana.prince@example.com',
      password: defaultPassword,
      first_name: 'Diana',
      last_name: 'Prince',
      gender: 'FEMALE',
      birthday: '1987-06-06',
      address: {
        address_line1: '987 Cedar St',
        address_line2: 'Suite 200',
        city: 'Paradise Island',
        state: 'HI',
        postal_code: '96801',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'eva_green',
      email: 'eva.green@example.com',
      password: defaultPassword,
      first_name: 'Eva',
      last_name: 'Green',
      gender: 'FEMALE',
      birthday: '1991-07-07',
      address: {
        address_line1: '123 Birch St',
        address_line2: 'Apt 1A',
        city: 'Smallville',
        state: 'KS',
        postal_code: '66002',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'frank_white',
      email: 'frank.white@example.com',
      password: defaultPassword,
      first_name: 'Frank',
      last_name: 'White',
      gender: 'MALE',
      birthday: '1980-08-08',
      address: {
        address_line1: '456 Willow St',
        address_line2: '',
        city: 'Riverdale',
        state: 'OH',
        postal_code: '43004',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'george_clark',
      email: 'george.clark@example.com',
      password: defaultPassword,
      first_name: 'George',
      last_name: 'Clark',
      gender: 'MALE',
      birthday: '1993-09-09',
      address: {
        address_line1: '789 Fir St',
        address_line2: 'Suite 300',
        city: 'Sunnydale',
        state: 'FL',
        postal_code: '32003',
        country: 'USA'
      },
      status: 'ACTIVE'
    },
    {
      username: 'hannah_baker',
      email: 'hannah.baker@example.com',
      password: defaultPassword,
      first_name: 'Hannah',
      last_name: 'Baker',
      gender: 'FEMALE',
      birthday: '1989-10-10',
      address: {
        address_line1: '321 Spruce St',
        address_line2: 'Apt 6F',
        city: 'Hill Valley',
        state: 'CO',
        postal_code: '80014',
        country: 'USA'
      },
      status: 'ACTIVE'
    }
  ]);
};
