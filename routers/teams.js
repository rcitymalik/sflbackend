const {Router} = require("express");
const {character} = require("../models");
const {team} = require("../models");
const middleWare = require("../auth/middleware")

const router = new Router();

router.post("/newteam",middleWare,async (req, res, next)=>{
    try{
        const {name,userId} = req.body;

        if (!name){
            return res.status(400).send("Please fill in the team name")
        }

        const newTeam = await team.create({name,userId});
        res.send(newTeam)
    }
    catch (e) {
        console.trace(e.message)
        next(e)
    }
});

router.post("/newmember",middleWare,async (req, res, next)=>{
    try{
        const{name,apiId,imageUrl,teamId} = req.body;

        if(!apiId||!name||!imageUrl||!teamId){
            return res.status(400).send("Character did not get added")
        }

        const findTeam = await team.findOne({where:{id:teamId},include:character})
        console.log("requested team",findTeam)

        console.log(`Team has ${findTeam.dataValues.characters.length} members`)

        console.log(findTeam)

        if (findTeam.dataValues.characters.length >= 6){
            return res.status(400).send("Team is full")
        }

        const newcharacter = await character.create({name,apiId,imageUrl,teamId});
        res.send(newcharacter)
    }
    catch (e) {
        console.trace(e.message)
        next(e)
    }
});

router.get("/getteam",middleWare, async (req, res, next)=>{
    try {
        const {id} = req.headers;
        const teamToFind = await team.findOne({where:{userId:id}})
        console.log(teamToFind);
        res.send(teamToFind)
    }
    catch (e) {
        console.log(e.message)
    }
});

router.get("/getteamcharacters",middleWare, async (req, res, next)=>{
    try {

        const {id} = req.headers;
        console.log("user id",id)
        const findTeam = await team.findOne({where:{userId:id}})
        const charactersToFind = await character.findAll({where:{teamId:findTeam.id}})
        console.log(charactersToFind);
        res.send(charactersToFind)
    }
    catch (e) {
        console.log(e.message)
    }
});

router.delete("/deletemember",middleWare,async (req, res, next)=>{
    try{
        const {id} = req.headers;
        console.log(id);
        const characterToFind = await character.findByPk(id);

        if(!characterToFind){
            return res.status(400).send("no character with that ID")
        }

        const characterDelete = await characterToFind.destroy();
        res.send(characterDelete)
    }
    catch (e){
        next(e)
    }
});

module.exports = router