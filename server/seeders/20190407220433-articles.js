/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [
    {
      id: 'efbd2ccd-4e06-4ecb-bfe0-baf303cd5577',
      title: 'How Quantum Teleportation Works',
      slug: 'howquantumteleportationworks-12345678',
      body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      description: 'A curious dive into teleportation',
      readingTime: '0.003',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/thedrizzyway/image/upload/v1573857002/forsetti/teleportation.jpg',
      published: true,
    },
    {
      id: 'ed74b7e0-a5f3-40af-9a77-7f9842ecac34',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      readingTime: '1 min read',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: '0be4313e-cbc8-41e3-b473-3305f3a9f79f',
      title: 'Gildard is working on it',
      slug: 'Gildard is working on it-12345678',
      body: 'Dickson is a boy',
      description: 'gildard@dickson.com',
      readingTime: '0.003',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: 'ddbc0491-f25b-44c1-a5df-25795fc7fada',
      title: 'Test Article 1',
      slug: 'Gildard is working on it-12345678',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ac nulla ut pulvinar.',
      description: 'gildard@dickson.com',
      readingTime: '0.003',
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: '8ec9d2a8-89c0-4af5-9406-240eb9fc1746',
      title: 'The wonderful world of insects',
      slug: 'thewonderfulworldofinsects-12345678',
      body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      description: 'Go to the ant you sluggard',
      readingTime: '0.003',
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      image: 'https://res.cloudinary.com/thedrizzyway/image/upload/v1573857016/forsetti/insects.jpg',
      published: true,
    },
    {
      id: '8ab8f8c6-1be8-44df-8f4f-0d80e30a3522',
      title: 'The importance of decentralisation',
      slug: 'importanceofdecentralisation-3456677788',
      body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      description: 'Decentralisation in lorem ipsum',
      readingTime: '0.003',
      published: true,
      tagList: ['tech', 'social'],
      userId: '3d1c5f17-7580-4cea-8647-99e7440c5d43',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg'
    },
    {
      id: '072cbf1f-3935-42b4-8aef-44c23628554f',
      title: 'Cats cannot taste sweets',
      slug: 'catscnnottastesweets-3654677788',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ac nulla ut pulvinar.',
      description: 'why would anyone want to read this though',
      readingTime: '0.003',
      published: true,
      tagList: ['social'],
      userId: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      image: 'https://res.cloudinary.com/forsetti/image/upload/v1554746740/forsetti/b9leichyadygoqudemre.jpg',
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
  ,
};
