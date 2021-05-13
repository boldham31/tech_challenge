const QueryResolver = require('./query-resolvers');

module.exports = {

    Query:{

        fetchSongData:(_,{bucketName, key}) => new QueryResolver().fetchSongData(bucketName,key)

    }
}