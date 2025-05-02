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
  dmxtype: {
    type: String,
    enum: ['single','multiple']
  },
  lightlist: {
    type: Array,
  },
  startAddress: {
    type: Number,
    // required: true,
  },
  endAddress: {
    type: Number,
    // required: true,
  },
  notes: {
    type: String,
    
  },
});

const Instrument = mongoose.model('Instrument', instrumentSchema);
export default Instrument;