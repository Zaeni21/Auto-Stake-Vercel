// File: api/autoStake.js import { ethers } from "ethers";

export default async function handler(req, res) { const PRIVATE_KEY = process.env.PRIVATE_KEY; const RPC = "https://rpc.nexus.xyz/http"; const provider = new ethers.providers.JsonRpcProvider(RPC); const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractAddress = "0xcc0014d47e41d8095D97C074b20B7abdA1F87E64"; const abi = [ { "inputs": [], "name": "stake", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getStakedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];

const contract = new ethers.Contract(contractAddress, abi, signer);

if (req.url.includes("unstake")) { try { const amount = await contract.getStakedAmount(await signer.getAddress()); const tx = await contract.unstake(amount); await tx.wait(); return res.status(200).json({ message: "Unstake all sukses!" }); } catch (err) { console.error(err); return res.status(500).json({ error: err.message }); } }

try { for (let i = 0; i < 50; i++) { const tx = await contract.stake({ value: ethers.utils.parseEther("1"), gasLimit: 200000 }); await tx.wait(); console.log(Tx ${i + 1} sukses); } res.status(200).json({ message: "Auto stake 50x complete!" }); } catch (err) { console.error(err); res.status(500).json({ error: err.message }); } }

