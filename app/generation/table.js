// holds any methos that interact with db table
const pool = require('../../databasePool');

class GenerationTable {
    static storeGeneration(generation) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
                [generation.expiration],
                (error, response) => {
                    if (error) return reject(error);
    
                    const generationId = response.rows[0].id;

                    resolve({ generationId });

                    return generationId;
                }
            );
        })
        
    }
}

module.exports = GenerationTable;