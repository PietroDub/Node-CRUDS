import mongoose from "mongoose";
async function main(){
    const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/ToDo';
    await mongoose.connect(databaseUrl);
    console.log("Conectou MongoDb");
}
main().catch((err)=>{
    console.log(err);
});
export default mongoose;