import * as mongoose from 'mongoose';
import {
  IFormQuoteGeneralArrayItem,
  IProductPerQuote,
  ITypeOfProductToQuote,
} from 'src/common/interfaces/quote.interface';

export const QuoteSchema = new mongoose.Schema(
  {
    // clients: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'clients',
    //     required: false,
    //   },
    // ],
    // clientsNames: [
    //   {
    //     type: Array<string>,
    //     required: true,
    //   },
    // ],
    client: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        required: false,
      },
    ],

    clientName: {
      type: Array<string>,
      required: true,
    },

    extraPercentage: { type: Number, required: true },
    formQuoteGeneralArray: {
      type: Array<IFormQuoteGeneralArrayItem>,
      required: true,
    },
    others: { type: Number, required: true },
    generalValue: { type: Number, required: true },
    quoteNumber: { type: Number, required: false },
    productsPerQuote: { type: Array<IProductPerQuote>, required: true },
    typesOfProductsToQuote: {
      type: Array<ITypeOfProductToQuote>,
      required: true,
    },
    observations: { type: String, required: false },
    metalGlassNit: { type: String, required: false },
    metalGlassCellPhoneNumber: { type: String, required: false },
    headerTitle: { type: String, required: false },
    clientNit: { type: String, required: false },
    clientContact: { type: String, required: false },
    city: { type: String, required: false },
    clientCellPhoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    eamil: { type: String, required: false },
  },
  { timestamps: true },
);
