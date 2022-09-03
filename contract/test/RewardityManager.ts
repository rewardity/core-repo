import {expect} from "chai";
import {ethers} from "hardhat";
import {RewardityManager, SimpleToken} from "../typechain-types";

describe("RewardityManager", async () => {

    describe("Deployment", async () => {
        it("Should set the right owner", async function () {
            // given
            const [owner] = await ethers.getSigners();
            const contract = await ethers.getContractFactory("RewardityManager");
            const currency = ethers.Wallet.createRandom().address;
            const rewardityManager = await contract.deploy(currency);

            // then
            expect(await rewardityManager.owner()).to.equal(owner.address);
        });
    });
    describe("Review action", async () => {
        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;

            const rewardityManagerFromAnotherSigner = rewardityManager.connect((await ethers.getSigners())[1]);

            // then
            await expect(rewardityManagerFromAnotherSigner.addReview(123))
                .revertedWith("Ownable: caller is not the owner");
        });
        it("Should have new reviews counted", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
            const user1Id = 123;
            const user2Id = 234;

            // when
            const transaction1 = await rewardityManager.addReview(user1Id);
            const transaction2 = await rewardityManager.addReview(user1Id);
            const transaction3 = await rewardityManager.addReview(user2Id);

            // then
            expect(await rewardityManager.userReviewsCount(user1Id)).to.equal(2);
            expect(await rewardityManager.userTokensBalance(user1Id)).to.equal(20);
            expect(await rewardityManager.userReviewsCount(user2Id)).to.equal(1);
            expect(await rewardityManager.userTokensBalance(user2Id)).to.equal(10);
            await expect(transaction1).to.emit(rewardityManager, 'ReviewAdded')
                .withArgs(user1Id, 1);
            await expect(transaction1).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user1Id, 10);
            await expect(transaction2).to.emit(rewardityManager, 'ReviewAdded')
                .withArgs(user1Id, 2);
            await expect(transaction2).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user1Id, 20);
            await expect(transaction3).to.emit(rewardityManager, 'ReviewAdded')
                .withArgs(user2Id, 1);
            await expect(transaction3).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user2Id, 10);
        });
    });
    describe("Like action", async () => {
        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;

            const rewardityManagerFromAnotherSigner = rewardityManager.connect((await ethers.getSigners())[1]);

            // when
            await expect(rewardityManagerFromAnotherSigner.addLike(123, 234))
                .revertedWith("Ownable: caller is not the owner");
        });
        it("Cannot like if zero balance", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;

            // then
            await expect(rewardityManager.addLike(123, 345))
                .revertedWith("insufficient funds");
        });
        it("Cannot like themselves", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
            const userId = 123;
            await rewardityManager.addReview(userId);

            // then
            await expect(rewardityManager.addLike(userId, userId))
                .revertedWith("user cannot like themselves");
        });
        it("Should have new likes counted", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
            const user1Id = 123;
            const user2Id = 234;
            await rewardityManager.addReview(user1Id);

            // when
            const transaction1 = await rewardityManager.addLike(user1Id, user2Id);
            const transaction2 = await rewardityManager.addLike(user1Id, user2Id);
            const transaction3 = await rewardityManager.addLike(user2Id, user1Id);

            // then
            expect(await rewardityManager.userLikesGivenCount(user1Id)).to.equal(2);
            expect(await rewardityManager.userLikesGivenCount(user2Id)).to.equal(1);
            expect(await rewardityManager.userTokensBalance(user1Id)).to.equal(9);
            expect(await rewardityManager.userTokensBalance(user2Id)).to.equal(1);
            await expect(transaction1).to.emit(rewardityManager, 'LikeAdded')
                .withArgs(user1Id, user2Id, 1, 1);
            await expect(transaction1).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user1Id, 9);
            await expect(transaction1).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user2Id, 1);
            await expect(transaction2).to.emit(rewardityManager, 'LikeAdded')
                .withArgs(user1Id, user2Id, 2, 2);
            await expect(transaction2).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user1Id, 8);
            await expect(transaction2).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user2Id, 2);
            await expect(transaction3).to.emit(rewardityManager, 'LikeAdded')
                .withArgs(user2Id, user1Id, 1, 1);
            await expect(transaction3).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user2Id, 1);
            await expect(transaction3).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(user1Id, 9);
        });
    });
    describe("Buy membership action", async () => {
        const userId = 123;

        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;

            const rewardityManagerFromAnotherSigner = rewardityManager.connect((await ethers.getSigners())[1]);

            // then
            await expect(rewardityManagerFromAnotherSigner.buyMembership(userId, 2))
                .revertedWith("Ownable: caller is not the owner");
        });

        it("Should be having STANDARD membership by default", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;

            // then
            expect(await rewardityManager.userMembership(userId)).to.equal(0);
        });

        it("Should buy a new STANDARD membership", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
            await rewardityManager.addReview(userId);

            // when
            const transaction = await rewardityManager.buyMembership(userId, 1);

            // then
            expect(await rewardityManager.userTokensBalance(userId)).to.equal(0);
            expect(await rewardityManager.userMembership(userId)).to.equal(1);
            await expect(transaction).to.emit(rewardityManager, 'MembershipChanged')
                .withArgs(userId, 1);
            await expect(transaction).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(userId, 0);
        });

        it("Should buy a new ADVANCED membership", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
            await rewardityManager.addReview(userId);
            await rewardityManager.addReview(userId);
            await rewardityManager.addReview(userId);

            // when
            const transaction = await rewardityManager.buyMembership(userId, 2);

            // then
            expect(await rewardityManager.userTokensBalance(userId)).to.equal(0);
            expect(await rewardityManager.userMembership(userId)).to.equal(2);
            await expect(transaction).to.emit(rewardityManager, 'MembershipChanged')
                .withArgs(userId, 2);
            await expect(transaction).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(userId, 0);
        });

        [0, 1, 2].forEach(membership => {
            it("Cannot buy not a higher membership", async () => {
                // given
                const contract = await ethers.getContractFactory("RewardityManager");
                const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
                await rewardityManager.addReview(userId);
                await rewardityManager.addReview(userId);
                await rewardityManager.addReview(userId);
                await rewardityManager.addReview(userId);
                await rewardityManager.addReview(userId);
                await rewardityManager.addReview(userId);
                await rewardityManager.buyMembership(userId, 2);

                // then
                await expect(rewardityManager.buyMembership(userId, membership))
                    .revertedWith("Can only upgrade membership");
            });
        });
    });
    describe("Withdrawal action", async () => {
        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;
            const anotherSigner = (await ethers.getSigners())[1];

            const rewardityManagerFromAnotherSigner = rewardityManager.connect(anotherSigner);

            // then
            await expect(rewardityManagerFromAnotherSigner.withdrawTokens(123, 100, anotherSigner.address))
                .revertedWith("Ownable: caller is not the owner");
        });
        it("Cannot withdraw if zero balance", async () => {
            // given
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(ethers.Wallet.createRandom().address) as RewardityManager;

            // then
            await expect(rewardityManager.withdrawTokens(123, 100, ethers.Wallet.createRandom().address))
                .revertedWith("insufficient funds");
        });
        it("Should allow user withdraw tokens", async () => {
            // given
            const userId = 123;
            const amountToWithdraw = 6;
            const userAddress = ethers.Wallet.createRandom().address;

            const erc20Contract = await ethers.getContractFactory("SimpleToken");
            const simpleTokenContract = await erc20Contract.deploy("SimpleToken", "TST", ethers.utils.parseEther("100000")) as SimpleToken;
            const contract = await ethers.getContractFactory("RewardityManager");
            const rewardityManager = await contract.deploy(simpleTokenContract.address) as RewardityManager;
            await simpleTokenContract.transfer(rewardityManager.address, ethers.utils.parseEther("100000"));
            await rewardityManager.addReview(userId);

            // when
            const transaction = await rewardityManager.withdrawTokens(userId, amountToWithdraw, userAddress);

            // then
            expect(await simpleTokenContract.balanceOf(userAddress)).to.equal(amountToWithdraw);
            await expect(transaction).to.emit(rewardityManager, 'UserBalanceChanged')
                .withArgs(userId, 4);
        });
    });
});
