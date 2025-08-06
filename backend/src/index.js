
import './config/env.js'
import connectDB from './config/db.js'
import { app } from './app.js'

const PORT = process.env.PORT || 5000


const startServer = async()=>{
    
    try {
        await connectDB()
        app.listen(PORT , ()=>{
            console.log('server started at', PORT)
        });
        
    } catch (error) {
        console.log('server did not started' , error);
        
    }
}

startServer()