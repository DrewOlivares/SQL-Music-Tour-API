'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stage', [{
      stage_name: 'Opal'
    },
    {
      stage_name: 'Greer'
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stage', null, {})
  }
};
