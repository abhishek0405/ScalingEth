# Foreboding

## Inspiration

 Blockchain Gaming Industry comprises less than 1% of the total Gaming Industry Market Size. The key reason for this apart from early adoption issues is the low engagement that current the blockchain games deliver.
With Foreboding, we aim to deliver a unique and engaging experience to the blockchain ecosystem which will help onboarding the next set of users to the Web 3 space. Usually the NFT games today are mostly based on fantasy sports, battle-style trading card games like Pokemon and even games like Axie Infinity which involves breeding and trading your own Pokemon-like pets. They are all single-player PvP games. 
Foreboding is thus, the world's first blockchain-based 2-player **collaborative** mystery game.


## How it works

Foreboding is a two-player game where the players need to co-operate and supply hints to the each other and solve puzzles. Imagine an apocalyptic world where a vaccine research goes wrong and leads to a pandemic wiping out majority of the population.
The only hope for survival is a scientist with his time travel technology to prevent all this happening. **Sounds interesting, doesn't it? Welcome to foreboding!**

There are two sides in this game - Player 1 chooses ‘Present’ and Player 2 chooses ‘Future’. One of the players is the scientist in the present where the vaccine development is under progress and the Future player is the scientist’s future self giving hints to the Present player.
There are hints scattered everywhere on the Future side where Player 2 needs to decipher them and provide appropriate hints to the Present player.
The Present player has to use those hints to progress in the game and ultimately stop the virus outbreak.

## Features

1.  An immersive experience by involving the co-operation of two players to brainstorm together and solve puzzles to progress.
    
2.  Providing in-game assets like Hint Cards and achievement badges in the form of NFTs.
    
3.  An in-built NFT marketplace to trade NFT cards and earn profits.
    
4.  In-built chat functionality to coordinate and communicate with our partner.
    
5.  Exciting puzzles!

## How it is made

The key technologies used are: 
- **Mantle network** for deploying the marketplace and achievement badge smart contracts
- Solidity for writing the contracts
- IPFS and web3.storage for storing the NFT data
- MERN stack for the fullstack browser application
- Sockets for the chat feature

The contract for the NFT marketplace and minting of the achievement badge NFTs is written in Solidity and deployed on the Mantle testnet using Remix. The marketplace allows players to purchase hint card NFTs that can be used anywhere in the game to help them with the puzzle solution. Mantle's L2 chain helped with the quick and inexpensive transactions that are highly essential in a game like this. The players can also choose to resell their hint cards on the marketplace, provided they are not used in the game. 

Upon completion of the game, the players receive an NFT achievement badge that gets added to their collection (can be viewed under My Badges tab). All NFT data is stored on IPFS. We used web3.storage to achieve this task.

React.js is used to build the frontend of the application. Node.js for the backend.  
The chat feature uses sockets. 

We had fun building the logic for the Hint NFT cards and their usage within the game. Say a hint card has 2 hints available. Once the player purchases it, they can use it at any point in the game. The game state is maintained at all times and the moment a hint is used, the hint to the next puzzle gets displayed. And in case the player uses up both the hints of their card, it gets inactive. They aren't allowed to resell it in the marketplace. This feature required some smart thinking and hence might be **noteworthy of a mention**.  



## Future scope

1.  This prototype will be improved upon in the coming iterations by using technologies like WebGL, Unity to create interactive graphics and render a smooth user experience.
   
2.  Create more in game assets using NFTs to access secret rooms with more exciting challenges within the game and other tools NFTs to help players solve puzzles.
  
3.  Build multiple games based out of different themes within the same universe, this would make the in game assets such as Hint Card NFTs and other tool NFTs interoperable within the games.
   
Lastly, we aim to not just build a game, but deliver unique experiences in our metaverse which will onboard the next generation of users to the web3 ecosystem.

## How to run

- Clone the repository:
`git clone https://github.com/abhishek0405/ScalingEth`
- Open a terminal and CD into backend folder
`cd backend`
- Open another terminal and CD into frontend folder
`cd frontend`
- Install all libraries in both folders. 
`npm install`
- Npm start in both terminals. You can see the React app open up on your browser.
`npm start`
- To start the socket communication for chat service, open a third terminal.
`cd backend
node index.js`

Alternatively you can check out our deployed version at: https://foreboding-mantle.vercel.app/

Note: You should be on the Mantle testnet on Metamask and have some BIT tokens to perform transactions. Here is the Mantle documentation to help you set up your wallet: https://docs.mantle.xyz/introducing-mantle/a-gentle-introduction

## Built with love by :blush:
- [Abhishek Anantharam](https://github.com/abhishek0405)
- [Vishaka Mohan](https://github.com/vishaka-mohan)
