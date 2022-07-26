const AWS = require("aws-sdk");
const s3 = new AWS.S3({
   region: 'eu-central-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient({
   apiVersion: '2012-08-10',
   region: 'eu-central-1'
 });
let sourceBucket = '';
let targetBucket = '';

exports.handler = async function index(event, context) {
   try {

      console.log('event:' + JSON.stringify(event));

      sourceBucket = "source-s3-bucket123454321";
      targetBucket = "target-s3-bucket123454321";

      const tableName = "hakunaMatata_table";
      const params = {
         TableName: tableName,
         Item: {
           PK_UploadedFileName: event.Records[0].s3.object.key,
           Timestamp: Date.now(),
           Size: event.Records[0].s3.object.size,
           Boolean: "Hakuna Matata"
         }
      };
      console.log(params);
      await dynamodb.put(params).promise();
      
      const copyParams = { 
         Bucket: targetBucket, 
         CopySource: sourceBucket + "/" + event.Records[0].s3.object.key, 
         Key: event.Records[0].s3.object.key
      };
      console.log('copyParams:' + JSON.stringify(copyParams));

      await s3.copyObject(copyParams).promise();
   
   } catch (error) {
      console.error(error);
   }
};