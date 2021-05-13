const s3 = require('../utils/config');

class QueryResolver {

    constructor(){
        this.s3 = s3;
    };

    async fetchSongData(bucketName, key) {
        const result = await s3.getObject(
            {
                Bucket: bucketName,
                Key: key
            }).promise()
        
        let song = {
            name: key,
            value: result.Body.toString('utf-8')
        }
        return song;
    }
    

};

module.exports = QueryResolver;