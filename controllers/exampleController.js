import Instrument from '../models/Instrument.js';

export const loadHome = async (req, res) => {
  try {
    const instruments = await Instrument.find();
    res.render('index', { instruments });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};



export const chooseAddress = async (req, res) => {
  try {
    res.render('index', );
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


