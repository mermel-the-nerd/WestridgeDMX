import Instrument from '../models/Instrument.js';


export const loadHome = async (req, res) => {
  try {
    const instruments = await Instrument.find();
    
    res.render('index', { instruments});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const addInstrument = async (req, res) => {
  try {
    //startAddress, endAddress
    const { name, number, dmxtype, notes } = req.body;
    console.log( name )
    

    const instrument = new Instrument({ name, dmxtype, notes});
    await instrument.save();  
    const instruments = await Instrument.find();
      
  




    res.render('index', { instruments});
    // res.redirect('/')
  } catch (err) {
    res.status(500).send('Server Error');
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



