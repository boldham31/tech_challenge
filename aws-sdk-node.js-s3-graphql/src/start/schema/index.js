const {gql} = require('apollo-server');
const Song = require('./Song')
const Query = gql`

    type Query {
        fetchSongData(bucketName:String,key:String): Song
    }
`;

module.exports = [
    Song,
    Query,
]