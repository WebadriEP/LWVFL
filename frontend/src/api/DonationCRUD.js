import axios from 'axios'

const addDonationFuntion = async (donorID, amount, date, type, notes) => {
    try {
      link = 'https://dontra-production.up.railway.app/api/donations/' + donorID;
    const res = await axios.post(link); {
      donorID,
      amount,
      date,
      type,
      notes
    };
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(res.data);
    console.error(err);
  }
  }; export { addDonationFuntion };

  const deleteDonationFunction = async (id) => {
    try {
      const res = await axios.delete(`https://dontra-production.up.railway.app/api/donations/${id}`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  export { deleteDonationFunction };