// External JavaScript file for the global script

// Declare a variable to track the total minted tokens
let totalMintedTokens = 0;

const mintingLimit = 10000; // Set a limit for total tokens that can be minted
 
document.addEventListener('DOMContentLoaded', function() {
    const mintButton = document.querySelector('#mintButton');
    const walletInput = document.querySelector('#walletInput');
    const tokenInput = document.querySelector('#tokenInput');
 
    mintButton.addEventListener('click', function(event) {
        // Prevent the form from submitting
        event.preventDefault();

        let walletAddress = walletInput.value;
        let tokenAmount = parseInt(tokenInput.value);

        // Validation for wallet address and token amount
        if (walletAddress !== '' && !isNaN(tokenAmount) && tokenAmount > 0) {
            // Call function to update minted tokens and get result
            let mintResult = updateMintedTokens(tokenAmount);

            if (mintResult) {
                // Notify the user about the minting process
                alert(`Minting ${tokenAmount} tokens to wallet: ${walletAddress}`);
            }
        } else {
            // Alert for invalid input
            alert('Please enter a valid wallet address and a positive number of tokens to mint.');
        }
    });
});
 
// Function to update the total minted tokens
function updateMintedTokens(amount) {
    let successfullyMinted = false;

    // Use a for loop to add tokens to the total, respecting the minting limit
    for (let i = 0; i < amount; i++) {
        if (totalMintedTokens < mintingLimit) {
            totalMintedTokens++;
            successfullyMinted = true;
        } else {
            alert('Minting limit reached. No more tokens can be minted.');
            break; // Exit the loop if the minting limit is reached
        }
    }

    document.getElementById('totalMinted').textContent = `Total Minted: ${totalMintedTokens}`;
    return successfullyMinted;
}

 // Asynchronous function to simulate token minting using a promise
function simulateTokenMinting(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let successfullyMinted = 0;
            for(let i = 0; i < amount; i++) {
                if (totalMintedTokens < mintingLimit) {
                    totalMintedTokens++;
                    successfullyMinted++;
                } else {
                    reject('Minting limit reached. No more tokens can be minted.');
                    break;
                }
            }
            document.getElementById('totalMinted').textContent = `Total Minted: ${totalMintedTokens}`;
            resolve(successfullyMinted);
        }, 2000); // Simulate a network request delay
    });
}

// Function to fetch and display crypto prices using GraphQL API Endpoint
async function fetchCryptoPrices() {
    const graphqlQuery = {
      query: `
        query {
          getCryptoPrices {
            id
            name
            usdPrice
          }
        }
      `,
    };
   
    try {
      const response = await fetch('http://localhost:5000/', { // Use your Apollo Server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });
      const { data } = await response.json();
   
      document.getElementById('cryptoPrices').innerHTML = data.getCryptoPrices.map(({ name, usdPrice }) => `
        <p>${name} Price: $${usdPrice}</p>
      `).join('');
    } catch (error) {
      console.error('Error fetching crypto prices with GraphQL:', error);
    }
  }
// Call the function to fetch and display crypto prices
fetchCryptoPrices();

