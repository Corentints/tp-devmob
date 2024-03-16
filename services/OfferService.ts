import Offer from '../models/Offer';
import Filter from '../models/Filter';

function getOfferPrice(offer: Offer): number {
  const formatted = offer.price.replace(/[^\d,]/g, '').replace(',', '.');
  return Math.floor(Math.round(parseFloat(formatted)));
}

export async function getOffers(filter?: Filter): Promise<Array<Offer>> {
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

    if (filter) {
      return res.filter((offer) => {
        if (filter.minPrice && getOfferPrice(offer) < filter.minPrice) {
          return false;
        }

        if (filter.maxPrice && getOfferPrice(offer) > filter.maxPrice) {
          return false;
        }

        if (filter.carModelYear && offer.carModelYear !== filter.carModelYear) {
          return false;
        }

        if (filter.query) {
          const carFullName = `${offer.carMake.toLowerCase()} ${offer.carModel.toLowerCase()}`;

          if (!carFullName.includes(filter.query.toLowerCase())) {
            return false;
          }
        }

        if (filter.country && !offer.country.toLowerCase().includes(filter.country.toLowerCase())) {
          return false;
        }

        if (filter.city && !offer.city.toLowerCase().includes(filter.city.toLowerCase())) {
          return false;
        }

        if (
          filter.description &&
          !offer.description.toLowerCase().includes(filter.description.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
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
