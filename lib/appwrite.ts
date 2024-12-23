import { Client, Account, Databases, ID, Permission, Role, Query, Storage } from 'react-native-appwrite'




export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '67684bb6001d1cdd4e03',  
    platform: 'com.jsm.aorad',
    database: '67684cec0005276484f1',
    userCollectionId: '67684d90001f925be9bb',
    videoCollectionId: '67684dad00145d6d8a9b',
    storageId:"6768608a001a4bbde1c1"
}

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)   
  .setPlatform(config.platform);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client)


export { account, client, ID, database, Permission, Role, Query, storage }