exports.up = function (knex) {
  return knex.schema.raw(`CREATE TABLE blog (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post TEXT NOT NULL,
      likes INT,
      comment VARCHAR(255)
    );`
  )
}

exports.down = function (knex){
  return knex.schema.raw("DROP TABLE IF EXISTS blog;");
}
