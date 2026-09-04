const mongoose =require('mongoose')
const dns =require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB(){
      try{
          const connect = await mongoose.connect(process.env.MONGO_URL)

        console.log("connect to DB");
      }catch(error){
        console.log("connection fail", error.message);

        
      }
        
}

module.exports= connectDB;