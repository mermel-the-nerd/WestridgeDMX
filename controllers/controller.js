import Instrument from '../models/Instrument.js';


const emptyBlocks = []



export const loadHome = async (req, res) => {
  try {
    const emptyBlocks = []
    const blocks = []
    const addressBank = []
    const instruments = await Instrument.find();

    
      for(let i=0;i<512;i++){
        addressBank.push(false)
        
      }
      

    
  
    instruments.sort((a, b) => a.startAddress - b.startAddress);
    
instruments.forEach(instrument=>{ //populating addressBank
 for(let i=instrument.startAddress-1;i<instrument.startAddress + instrument.lightlist.length-1;i++){
  addressBank[i] = true
 }
})

console.log(addressBank)
let group = []

addressBank.forEach((address, index) => { //populating emptyBlocks
  if (!address) {
    group.push(index + 1);
  } else if (group.length > 0) {
    emptyBlocks.push(group);
    group = [];
  }
});

// Push the last group if it exists
if (group.length > 0) {
  emptyBlocks.push(group);
}
console.log(emptyBlocks)

instruments.forEach(instrument => {
  if (!instrument.pending) {
    blocks.push({
      type: 'instrument',
      start: instrument.startAddress,
      end: instrument.startAddress + instrument.lightlist.length - 1,
      data: instrument
    });
  }
});

// Add emptyBlocks
emptyBlocks.forEach(group => {
  if (Array.isArray(group) && group.length > 0) {
    blocks.push({
      type: 'empty',
      start: group[0],
      end: group[group.length - 1],
      data: group
    });
  }
});

// Sort all by start address
blocks.sort((a, b) => a.start - b.start);

console.log(blocks)

    res.render('index', { blocks, emptyBlocks, instruments});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const addInstrument = async (req, res) => {
  try {
    //startAddress, endAddress
    const { name, number,  lightlist, user, startAddress} = req.body;
  
    
    const instrument = new Instrument({ name, lightlist, user, startAddress});
    await instrument.save();  
    const instruments = await Instrument.find();
      
    

    // res.render('index', { instruments});
      res.redirect('/')
  } catch (err) {
    res.status(500).send(err);
  }
};

export const confirmChange = async (req, res) => {
  try {
    const instrumentId = req.params.id;

    await Instrument.findByIdAndUpdate(instrumentId, { pending: false });

    res.redirect('/');
  } catch (err) {
    console.error(err); // helpful for debugging
    res.status(500).send('Server Error');
  }
};

export const updateInstrument = async (req, res) => {
  try {
   
    const instrumentId = req.params.id;
    const index = req.query.index;
    const light = req.body.light
    
    const instrument = await Instrument.findById(instrumentId)

    instrument.lightlist[index] = light

    await instrument.save()    
    

    res.redirect('/')
  } catch (err) {
    console.error(err); // helpful for debugging
    res.status(500).send('Server Error');
  }
};




export const deleteInstrument = async (req, res) => {
  try {
    const instrumentId = req.params.id;
    await Instrument.findByIdAndDelete(instrumentId)
       
    res.redirect('/');
  } catch (err) {
    console.error(err); // helpful for debugging
    res.status(500).send('Server Error');
  }
};



