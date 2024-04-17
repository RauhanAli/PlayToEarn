// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

//thirdweb contracts
import "@thirdweb-dev/contracts/prebuilts/drop/DropERC1155.sol";
import "@thirdweb-dev/contracts/prebuilts/token/TokenERC20.sol";
import "@thirdweb-dev/contracts/external-deps/openzeppelin/utils/ERC1155/ERC1155Holder.sol";

//OpenZeppelin contracts
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Minning is ReentrancyGuard, ERC1155Holder {
    DropERC1155 public immutable Hammer;
    TokenERC20 public immutable SapphireToken;

    constructor(DropERC1155 hammerAddress, TokenERC20 sapphireAddress) {
        Hammer = hammerAddress;
        SapphireToken = sapphireAddress;
    }

    struct TokenStaked {
        bool isData;
        uint256 tokenId;
    }
    struct PlayerUpdate {
        bool isStake;
        uint256 lastStake;
    }

    mapping(address => TokenStaked) public playerHammer;
    mapping(address => PlayerUpdate) public playerLastUpdated;

    //allow palyer to stake their tokens
    function stake(uint256 _tokenId) external nonReentrant {
        require(
            playerHammer[msg.sender].tokenId >= 1,
            "You don't have tokens to stake"
        );

        //if user had already staked a ellie nft send back to them
        if (playerHammer[msg.sender].isData) {
            Hammer.safeTransferFrom(
                address(this),
                msg.sender,
                playerHammer[msg.sender].tokenId,
                1,
                "Returning you your old nft"
            );
        }
        //caculate rewards
        uint256 reward = calculateReward(msg.sender);
        SapphireToken.transfer(msg.sender, reward);

        //transfer token to staking contract
        Hammer.safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            1,
            "Staking your NFT"
        );

        //update the mappings
        playerHammer[msg.sender].isData = true;
        playerHammer[msg.sender].tokenId = _tokenId;

        playerLastUpdated[msg.sender].isStake = true;
        playerLastUpdated[msg.sender].lastStake = block.timestamp;
    }

    function claim() external nonReentrant {
        //caculate rewards
        uint256 reward = calculateReward(msg.sender);
        SapphireToken.transfer(msg.sender, reward);

        playerLastUpdated[msg.sender].isStake = true;
        playerLastUpdated[msg.sender].lastStake = block.timestamp;
    }

    function withdraw() external nonReentrant {
        require(
            playerHammer[msg.sender].isData,
            "You do not have a Hammer to withdraw"
        );

        //caculate rewards
        uint256 reward = calculateReward(msg.sender);
        SapphireToken.transfer(msg.sender, reward);

        Hammer.safeTransferFrom(
            address(this),
            msg.sender,
            playerHammer[msg.sender].tokenId,
            1,
            "Returing your staked NFT."
        );

        playerHammer[msg.sender].isData = false;

        playerLastUpdated[msg.sender].isStake = false;
        playerLastUpdated[msg.sender].lastStake = block.timestamp;
    }

    // Calculate the rewards the player is owed since last time they were paid out
    // The rewards rate is 20,000,000 per block.
    // This is calculated using block.timestamp and the playerLastUpdate.
    // If playerLastUpdate or playerPickaxe is not set, then the player has no rewards.

    function calculateReward(
        address player
    ) public view returns (uint256 _rewards) {
        if (
            !playerHammer[player].isData || !playerLastUpdated[player].isStake
        ) {
            return 0;
        }
        uint256 timeDiff = block.timestamp -
            playerLastUpdated[player].lastStake;
        uint256 rewards = timeDiff *
            10_000_000_000 *
            (playerHammer[player].tokenId + 1);

        return rewards;
    }
}
