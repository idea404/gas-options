require('dotenv').config();
const { PublicClient, HttpTransport } = require('@nilfoundation/niljs');

// Initialize the client
const client = new PublicClient({
  transport: new HttpTransport({
    endpoint: process.env.RPC_URL,
    timeout: 60000, // Increase timeout to 60 seconds
  }),
});

async function testConnection() {
  try {
    // Simple request to test connection
    const chainId = await client.chainId();
    console.log('Successfully connected to the network');
    console.log('Chain ID:', chainId);
    return true;
  } catch (error) {
    console.error('Failed to connect to the network:', error.message);
    if (error.data?.data) {
      console.error('Server response:', error.data.data);
    }
    return false;
  }
}

async function getAccountInfo(address) {
  try {
    // Get account balance
    const balance = await client.getBalance(address, 'latest');
    console.log('Account balance:', balance.toString());
    
    // Get message count (transaction count)
    const msgCount = await client.getMessageCount(address, 'latest');
    console.log('Message count:', msgCount);
    
    return { balance, msgCount };
  } catch (error) {
    console.error('Error fetching account info:', error.message);
    throw error;
  }
}

async function main() {
  try {
    // First test the connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Cannot proceed due to connection issues');
      return;
    }
    
    // Get gas price
    const gasPrice = await client.getGasPrice(1);
    console.log('Current gas price:', gasPrice.toString());
    
    // Example: Get account info for a specific address
    // Replace with your actual address
    const address = process.env.ADDRESS;
    await getAccountInfo(address);
    return
    
  } catch (error) {
    console.error('Error in main:', error.message);
  }
}

main();