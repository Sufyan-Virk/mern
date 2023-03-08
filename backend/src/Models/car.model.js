import mongoose from 'mongoose';
let Schema = mongoose.Schema ;

const carSchema = Schema({
  model:{type:String, required:true},
  color:{type:String, required:true},
  make:{type:String, required:true},
  registrationNo:{type:String, required:true},
  category:{type: Schema.Types.ObjectId, ref: 'Category'}
}, { versionKey: false });

const car = mongoose.model('Car', carSchema);

export default car;