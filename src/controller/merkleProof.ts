import { Request, Response } from "express";
import data from './proof.json'

interface AddressData {
  address: string;
  totalAmount: string;
  proofs: string[];
}

interface JSONData {
  addressData: AddressData[];
}

// const data = fs.readFileSync(__dirname + "/proof.json");
const jsonData: JSONData = data as JSONData;

const getDataForAddress = (walletAddress: string) => {
  return jsonData.addressData.find(
    (e: AddressData) => e.address.toLowerCase() === walletAddress.toLowerCase()
  );
};

export const getProofs = async (req: Request, res: Response) => {
  const walletAddress: string = (req.query.walletAddress as string) || "";

  if (walletAddress && walletAddress.length > 1) {
    const data = getDataForAddress(walletAddress);
    res.json(data);
  } else {
    res.json({ found: false });
  }
};
