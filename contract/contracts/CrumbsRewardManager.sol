pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CrumbsRewardManager is Ownable {

    enum Membership { BASE, STANDARD, ADVANCED }

    address public tokenAddress;

    mapping(uint256 => uint256) public userReviewsCount;
    mapping(uint256 => uint256) public userLikesGivenCount;
    mapping(uint256 => uint256) public userLikesReceivedCount;
    mapping(uint256 => uint256) public userTokensBalance;

    mapping(uint256 => Membership) public userMembership;
    mapping(Membership => uint256) public membershipPrice;

    event ReviewAdded(uint256 userId, uint256 count);
    event LikeAdded(uint256 fromUserId, uint256 toUserId, uint256 fromUserLikesGiven, uint256 toUserLikesReceived);
    event UserBalanceChanged(uint256 userId, uint256 newBalance);
    event MembershipChanged(uint256 userId, Membership newMembership);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        membershipPrice[Membership.STANDARD] = 10;
        membershipPrice[Membership.ADVANCED] = 30;
    }

    modifier checkBalance(uint256 userId, uint256 minBalance) {
        require(userTokensBalance[userId] >= minBalance, "insufficient funds");
        _;
    }

    function addReview(uint256 userId) public onlyOwner {
        userReviewsCount[userId] = userReviewsCount[userId] + 1;
        userTokensBalance[userId] = userTokensBalance[userId] + 10;
        emit ReviewAdded(userId, userReviewsCount[userId]);
        emit UserBalanceChanged(userId, userTokensBalance[userId]);
    }

    function addLike(uint256 fromUserId, uint256 toUserId) public onlyOwner checkBalance(fromUserId, 1) {
        require(fromUserId != toUserId, "user cannot like themselves");

        userLikesGivenCount[fromUserId] = userLikesGivenCount[fromUserId] + 1;
        userLikesReceivedCount[toUserId] = userLikesReceivedCount[toUserId] + 1;
        userTokensBalance[fromUserId] = userTokensBalance[fromUserId] - 1;
        userTokensBalance[toUserId] = userTokensBalance[toUserId] + 1;

        emit LikeAdded(fromUserId, toUserId, userLikesGivenCount[fromUserId], userLikesReceivedCount[toUserId]);
        emit UserBalanceChanged(fromUserId, userTokensBalance[fromUserId]);
        emit UserBalanceChanged(toUserId, userTokensBalance[toUserId]);
    }

    function buyMembership(uint256 userId, Membership membership) public onlyOwner checkBalance(userId, membershipPrice[membership]) {
        require(userMembership[userId] < membership, "Can only upgrade membership");

        userTokensBalance[userId] = userTokensBalance[userId] - membershipPrice[membership];
        userMembership[userId] = membership;

        emit MembershipChanged(userId, userMembership[userId]);
        emit UserBalanceChanged(userId, userTokensBalance[userId]);
    }
}
