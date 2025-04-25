import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // creator: {

  // },
  startAddress: {
    type: Number,
  },
  endAddress: {
    type: Number,
  },
  notes: {
    type: String,
    
  },
});

const Instrument = mongoose.model('Instrument', instrumentSchema);
export default Instrument;