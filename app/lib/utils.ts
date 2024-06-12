import Moralis from "moralis";

export function convertIPFSUriToUrl(ipfsUri: string) {
    const ipfsHash = ipfsUri.replace('ipfs://', ''); // Remove 'ipfs://' prefix
    return `https://ipfs.moralis.io/ipfs/${ipfsHash}`;
}

export function encodeUrl(url: string) {
    return url.replace(/:/g, '%03A').replace(/\//g, '--');
}

// Function to decode URL by replacing "-" back to "/"
export function decodeUrl(encodedUrl: string) {
    return encodedUrl.replace(/%03A/g, ':').replace(/--/g, '/');
}

export const startServer = async () => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });
    }
  };