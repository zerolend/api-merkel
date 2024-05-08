import { Request, Response } from "express";
import fs from "fs";

interface AddressData {
  address: string;
  totalAmount: string;
  proofs: string[];
}

const data = fs.readFileSync(__dirname + "/proof.json");
const json = JSON.parse(data.toString());

const getDataForAddress = (walletAddress: string) => {
  return json.addressData.find(
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
