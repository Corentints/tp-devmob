import Offer from '../models/Offer';

export async function getOffers(query?: string): Promise<Array<Offer>> {
  try {
    const res: Array<Offer> = [];

    const offers = require('../helpers/data.json');

    offers.map((value: any) => {
      res.push({
        id: value.id,
        carMake: value.carMake,
        carModel: value.carModel,
        carModelYear: value.carModelYear,
        price: value.price,
        avatar: value.avatar,
        saler: value.saler,
        phone: value.phone,
        country: value.country,
        city: value.city,
        description: value.description,
      });
    });

    if (query && query !== '') {
      return res.filter(
        (m) =>
          m.carMake.toLowerCase().includes(query.toLowerCase()) ||
          m.carModel.toLowerCase().includes(query.toLowerCase())
      );
    }

    return res;
  } catch (error: any) {
    console.log(`Error with function getOffers ${error.message}`);
    throw error;
  }
}

export async function getOfferById(id: string): Promise<Offer | undefined> {
  try {
    const list: Array<Offer> = [];

    const offers = require('../helpers/data.json');

    offers.map((value: Offer) => {
      list.push({
        id: value.id,
        carMake: value.carMake,
        carModel: value.carModel,
        carModelYear: value.carModelYear,
        price: value.price,
        avatar: value.avatar,
        saler: value.saler,
        phone: value.phone,
        country: value.country,
        city: value.city,
        description: value.description,
      });
    });

    return list.find((m) => m.id === id);
  } catch (error: any) {
    console.log(`Error with function getOfferById ${error.message}`);
    throw error;
  }
}
