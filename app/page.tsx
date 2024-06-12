'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [provider, setProvider] = useState<ethers.AbstractProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (window?.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum)
      setProvider(newProvider);
    } else {
      setProvider(ethers.getDefaultProvider())
    }
  }, []);

  const handleLogin = async () => {
    if (!provider) {
      setMessage("Provider not found");
      return;
    }

    try {
      const newSigner = await (provider as ethers.BrowserProvider).getSigner();
      setSigner(newSigner);

      const account = await newSigner.getAddress();
      setIsConnected(true);

      const userData = { address: account, chain: 1 };
      // Making a post request to our 'request-message' endpoint
      const { data } = await axios.post(`/api/request-message`,
        userData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const dataMessage = data.message;
      // Signing the received message via MetaMask
      const signature = await newSigner.signMessage(dataMessage);

      await axios.post(`/api/verify`,
        {
          message: dataMessage,
          signature,
        });

      router.replace('/dashboard')
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage("Authentication error");
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-semibold mb-9">Mintable Lite</h1>
      <button onClick={handleLogin} className="bg-orange-500 text-white py-3 px-5 rounded-md hover:bg-orange-600 transition-colors duration-300 ease-in-out">
        Login with MetaMask
      </button>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
}
