import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    enum: ["Ms Kellogg", "Rob", "Maddie"]
  },
  pending: {
    type: Boolean,
    default: true,
    
  },
  
  lightlist: {
    type: Array,
  },
  startAddress: {
    type: Number,
    //default: 1,
    // required: true,
  },
    
});

const Instrument = mongoose.model('Instrument', instrumentSchema);
export default Instrument;