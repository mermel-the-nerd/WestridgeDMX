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
    const { name, number, startAddress, endAddress, dmxtype, notes } = req.body;
    console.log( name )
    

    const instrument = new Instrument({ name, notes});

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



