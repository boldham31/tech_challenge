
const s3 = require('../utils/config');
const {promisify} = require('util');
const {extname} = require('path');

class MutationResolver {

    constructor(){
        this.s3 = s3;
    };

    //create a bucket.
    async createBucket(bucketName){
    
    //create an object to hold the name of the bucket.
    const params = {
        Bucket:bucketName
    };

    //promisify the createBucket() function so that we can use async/await syntax.
    let create_bucket = promisify(this.s3.createBucket.bind(this.s3));

    //call the function to create the bucket.
    await create_bucket(params).catch(console.log);

    //return response to client.
    return {
        success:true,
        message:"Bucket created successfully."
    };

    };
    
    //upload object.
    async uploadObject(file,bucketName){
        // flow to upload songData.json object into S3 Bucket if you were to want to do it programmatically
    };
};

module.exports = MutationResolver;