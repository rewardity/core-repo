import {expect} from "chai";
import {ethers} from "hardhat";
import {CrumbsRewardManager} from "../typechain-types";

describe("CrumbsRewardManager", async () => {

    describe("Deployment", async () => {
        it("Should set the right owner", async function () {
            // given
            const [owner] = await ethers.getSigners();
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const currency = ethers.Wallet.createRandom().address;
            const crumbsRewardManager = await contract.deploy(currency);

            // then
            expect(await crumbsRewardManager.owner()).to.equal(owner.address);
        });
    });
    describe("Review action", async () => {
        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;

            const crumbsRewardManagerFromAnotherSigner = crumbsRewardManager.connect((await ethers.getSigners())[1]);

            // when
            await expect(crumbsRewardManagerFromAnotherSigner.addReview(123))
                .revertedWith("Ownable: caller is not the owner");
        });
        it("Should have new reviews counted", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;
            const user1Id = 123;
            const user2Id = 234;

            // when
            const transaction1 = await crumbsRewardManager.addReview(user1Id);
            const transaction2 = await crumbsRewardManager.addReview(user1Id);
            const transaction3 = await crumbsRewardManager.addReview(user2Id);

            // then
            expect(await crumbsRewardManager.userReviewsCount(user1Id)).to.equal(2);
            expect(await crumbsRewardManager.userTokensBalance(user1Id)).to.equal(20);
            expect(await crumbsRewardManager.userReviewsCount(user2Id)).to.equal(1);
            expect(await crumbsRewardManager.userTokensBalance(user2Id)).to.equal(10);
            await expect(transaction1).to.emit(crumbsRewardManager, 'ReviewAdded')
                .withArgs(user1Id, 1);
            await expect(transaction1).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user1Id, 10);
            await expect(transaction2).to.emit(crumbsRewardManager, 'ReviewAdded')
                .withArgs(user1Id, 2);
            await expect(transaction2).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user1Id, 20);
            await expect(transaction3).to.emit(crumbsRewardManager, 'ReviewAdded')
                .withArgs(user2Id, 1);
            await expect(transaction3).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user2Id, 10);
        });
    });
    describe("Like action", async () => {
        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;

            const crumbsRewardManagerFromAnotherSigner = crumbsRewardManager.connect((await ethers.getSigners())[1]);

            // when
            await expect(crumbsRewardManagerFromAnotherSigner.addLike(123, 234))
                .revertedWith("Ownable: caller is not the owner");
        });
        it("Cannot like if zero balance", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;

            // when
            await expect(crumbsRewardManager.addLike(123, 345))
                .revertedWith("zero balance");
        });
        it("Cannot like themselves", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;
            const userId = 123;
            await crumbsRewardManager.addReview(userId);

            // when
            await expect(crumbsRewardManager.addLike(userId, userId))
                .revertedWith("user cannot like themselves");
        });
        it("Should have new likes counted", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;
            const user1Id = 123;
            const user2Id = 234;
            await crumbsRewardManager.addReview(user1Id);

            // when
            const transaction1 = await crumbsRewardManager.addLike(user1Id, user2Id);
            const transaction2 = await crumbsRewardManager.addLike(user1Id, user2Id);
            const transaction3 = await crumbsRewardManager.addLike(user2Id, user1Id);

            // then
            expect(await crumbsRewardManager.userLikesGivenCount(user1Id)).to.equal(2);
            expect(await crumbsRewardManager.userLikesGivenCount(user2Id)).to.equal(1);
            expect(await crumbsRewardManager.userTokensBalance(user1Id)).to.equal(9);
            expect(await crumbsRewardManager.userTokensBalance(user2Id)).to.equal(1);
            await expect(transaction1).to.emit(crumbsRewardManager, 'LikeAdded')
                .withArgs(user1Id, user2Id, 1, 1);
            await expect(transaction1).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user1Id, 9);
            await expect(transaction1).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user2Id, 1);
            await expect(transaction2).to.emit(crumbsRewardManager, 'LikeAdded')
                .withArgs(user1Id, user2Id, 2, 2);
            await expect(transaction2).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user1Id, 8);
            await expect(transaction2).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user2Id, 2);
            await expect(transaction3).to.emit(crumbsRewardManager, 'LikeAdded')
                .withArgs(user2Id, user1Id, 1, 1);
            await expect(transaction3).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user2Id, 1);
            await expect(transaction3).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(user1Id, 9);
        });
    });

    describe("Buy membership action", async () => {
        const userId = 123;

        it("Cannot be triggered by not an owner", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;

            const crumbsRewardManagerFromAnotherSigner = crumbsRewardManager.connect((await ethers.getSigners())[1]);

            // when
            await expect(crumbsRewardManagerFromAnotherSigner.buyMembership(userId, 2))
                .revertedWith("Ownable: caller is not the owner");
        });

        it("Should be having STANDARD membership by default", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;

            // then
            expect(await crumbsRewardManager.userMembership(userId)).to.equal(0);
        });

        it("Should buy a new STANDARD membership", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;
            await crumbsRewardManager.addReview(userId);

            // when
            const transaction = await crumbsRewardManager.buyMembership(userId, 1);

            // then
            expect(await crumbsRewardManager.userTokensBalance(userId)).to.equal(0);
            expect(await crumbsRewardManager.userMembership(userId)).to.equal(1);
            await expect(transaction).to.emit(crumbsRewardManager, 'MembershipChanged')
                .withArgs(userId, 1);
            await expect(transaction).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(userId, 0);
        });

        it("Should buy a new ADVANCED membership", async () => {
            // given
            const contract = await ethers.getContractFactory("CrumbsRewardManager");
            const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;
            await crumbsRewardManager.addReview(userId);
            await crumbsRewardManager.addReview(userId);
            await crumbsRewardManager.addReview(userId);

            // when
            const transaction = await crumbsRewardManager.buyMembership(userId, 2);

            // then
            expect(await crumbsRewardManager.userTokensBalance(userId)).to.equal(0);
            expect(await crumbsRewardManager.userMembership(userId)).to.equal(2);
            await expect(transaction).to.emit(crumbsRewardManager, 'MembershipChanged')
                .withArgs(userId, 2);
            await expect(transaction).to.emit(crumbsRewardManager, 'UserBalanceChanged')
                .withArgs(userId, 0);
        });

        [0, 1, 2].forEach(membership => {
            it("Cannot buy not a higher membership", async () => {
                // given
                const contract = await ethers.getContractFactory("CrumbsRewardManager");
                const crumbsRewardManager = await contract.deploy(ethers.Wallet.createRandom().address) as CrumbsRewardManager;
                await crumbsRewardManager.addReview(userId);
                await crumbsRewardManager.addReview(userId);
                await crumbsRewardManager.addReview(userId);
                await crumbsRewardManager.buyMembership(userId, 2);

                // then
                await expect(crumbsRewardManager.buyMembership(userId, membership))
                    .revertedWith("Can only upgrade membership");
            });
        });
    });
});
