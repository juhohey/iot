
exports.up = function(knex, Promise) {
      return knex.raw('ALTER TABLE `readings` ADD COLUMN `device` INTEGER REFERENCES `devices`(`id`)');
};

exports.down = function(knex, Promise) {
   
};
