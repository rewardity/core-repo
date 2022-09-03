pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrumbsRewardManager {

    address payable public owner;
    address public tokenAddress;
    mapping(uint256 => uint256) public userReviewsCount;
    mapping(uint256 => uint256) public userLikesGivenCount;
    mapping(uint256 => uint256) public userLikesReceivedCount;
    mapping(uint256 => uint256) public userTokensBalance;

    event ReviewAdded(uint256 userId, uint256 count);
    event LikeAdded(uint256 fromUserId, uint256 toUserId, uint256 fromUserLikesGiven, uint256 toUserLikesReceived);
    event UserBalanceChanged(uint256 userId, uint256 newBalance);

    constructor(address _tokenAddress) {
        owner = payable(msg.sender);
        tokenAddress = _tokenAddress;
    }

    function addReview(uint256 userId) public {
        userReviewsCount[userId] = userReviewsCount[userId] + 1;
        userTokensBalance[userId] = userTokensBalance[userId] + 10;
        emit ReviewAdded(userId, userReviewsCount[userId]);
        emit UserBalanceChanged(userId, userTokensBalance[userId]);
    }

    function addLike(uint256 fromUserId, uint256 toUserId) public {
        require(userTokensBalance[fromUserId] >= 1, "zero balance");
        require(fromUserId != toUserId, "user cannot like themselves");
        userLikesGivenCount[fromUserId] = userLikesGivenCount[fromUserId] + 1;
        userLikesReceivedCount[toUserId] = userLikesReceivedCount[toUserId] + 1;
        userTokensBalance[fromUserId] = userTokensBalance[fromUserId] - 1;
        userTokensBalance[toUserId] = userTokensBalance[toUserId] + 1;

        emit LikeAdded(fromUserId, toUserId, userLikesGivenCount[fromUserId], userLikesReceivedCount[toUserId]);
        emit UserBalanceChanged(fromUserId, userTokensBalance[fromUserId]);
        emit UserBalanceChanged(toUserId, userTokensBalance[toUserId]);
    }
}
