exports.up = async (knex) => {
  await knex.schema
    .createTable('person', (person) => {
      person.increments('person_id')
      person.string('email', 200).notNullable()
      person.string('username', 200).notNullable()
      person.string('password', 200).notNullable()
      person.timestamps(false, true)
    })
    
    await knex.schema
      .createTable('potlucks', (potlucks) => {
        potlucks.increments('potluck_id')
        potlucks.integer('person_id')
        .unsigned()
        .references('person_id')
        .inTable('person')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        potlucks.string('username', 128).notNullable()
        potlucks.string('event_name', 128).notNullable()
        potlucks.string('description', 256)
        potlucks.string('event_date').notNullable()
        potlucks.string('event_time').notNullable()
        potlucks.string('location').notNullable()
        potlucks.string('role').notNullable()
      })

      await knex.schema 
      .createTable('foods', (foods) => {
        foods.increments('food_id')
        foods.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references('potluck_id')
        .inTable('potlucks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        foods.integer('person_id')
        .unsigned()
        .references('person_id')
        .inTable('person')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        foods.string('username')
        foods.string('food_wanted').notNullable()
      })
      await knex.schema
      .createTable('attending-potlucks', (attending) => {
        attending.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references('potluck_id')
        .inTable('potlucks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        attending.integer('person_id')
        .unsigned()
        .references('person_id')
        .inTable('person')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        attending.string('username')
        attending.string('role').notNullable()
      })
}



exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('person')
  await knex.schema.dropTableIfExists('potlucks')
  await knex.schema.dropTableIfExists('foods')
}
