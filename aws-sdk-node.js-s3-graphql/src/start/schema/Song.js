const {gql} = require('apollo-server');

const Song = gql`
    type Song {
        name:String!
        value:String!
    }
`;

module.exports = Song;