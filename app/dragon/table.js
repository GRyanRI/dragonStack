const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');

class DragonTable {
    static storeDragon(dragon) {
        const { birthdate, nickname, generationId } = dragon;

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO dragon(birthdate, nickname, "generationId") 
                 VALUES($1, $2, $3) RETURN id`,
                 [birthdate, nickname, generationId],
                 (error, response) => {
                     if (error) return reject(error);

                     const dragonId = response.rows[0].id;

                     Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({
                            dragonId, traitType, trainValue
                        });
                     }))
                    .then(() => resolve({ dragonId }))
                    .catch(error => reject(error));

                     resolve({ dragonId });
                 }
            )
        });
    }
}

module.exports = DragonTable;