import mongoose from 'mongoose'




//creae Schma 

const UserSchema =mongoose.Schema({


   
  email:{

          type:String,
          required :true,
          trim:true

  },
  username:{

    type:String,
    trim:true

},
  name:{

    type:String,
    trim:true,
    required:true

},
  password: {

    type:String,
    required :true,
    trim:true

},
  img:String,
  cover:String,
  username:String,
  location:String,
  number:Number,
  gender:String,
  gallary:Array,
  isadmin:{
      type:Boolean,
      default:false
  },
  isverify:{

        type:Boolean,
        default:false
  }


},{timestamps:true}) 





// create collection 

 export default mongoose.model('alluser',UserSchema)


