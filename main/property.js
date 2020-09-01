const listProperties = (knex) => {
  return knex('properties').innerJoin('users', 'properties.userId', 'users.id');
}

exports.listProperties = listProperties;