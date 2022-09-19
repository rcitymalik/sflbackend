const {Router} = require("express");
const {auction} = require("../models");
const {bid} = require("../models");
const middleWare = require("../auth/middleware")

const router = new Router();

router.get("/getauction", async (req, res, next)=>{
    try {
        const auctions = await auction.findAll({include:bid});
        res.send(auctions)
    }
    catch (e) {
        console.log(e.message)
        next(e)
    }
});

router.get("/auction/:id",async (req, res, next)=>{
    try {
        const {id} = req.params
        console.log(`auction Id ${id}`)
        const auctionToFind = await auction.findByPk(id,{include:bid})
        res.send(auctionToFind)
    }
    catch (e) {
        console.log(e.message)
        next(e)
    }
});

router.post("/postauctionproposal",middleWare,async (req, res, next)=>{
    try {
        const {ammount,auctionId,userId} = req.body;

        if(!ammount||!auctionId||!userId){
            return res.status(400).send("Can not post the auction")
        }
        const newBid = await bid.create({ammount,auctionId,userId})
        res.send(newBid)
    }
    catch (e) {
        console.log(e.message)
        next(e)
    }
});

router.post("/postauction",middleWare, async (req, res, next)=>{
    try {
        const {productName,productDescription,productImg,productCondition,productType,minBid} = req.body;
        if (!productName||!productDescription||!productImg||!productCondition||!productType||!minBid){
            return res.status(400).send("can not make an auction")
        }
        const newAuction = await auction.create({productName,productDescription,productImg,productCondition,productType,minBid})
        res.send(newAuction)
    }
    catch (e) {
        console.log(e.message)
        next(e)
    }
})

module.exports = router;