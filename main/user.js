function listUsers(knex) {
  return knex.select().from('users');
}

exports.listUsers = listUsers;