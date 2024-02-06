const graphql = require('graphql')
const  { GraphQLObjectType, GraphQLString,GraphQLID,GraphQLInt, GraphQLSchema,GraphQLList } = graphql;
const _ = require('lodash')
var creators = [
    {
        name:"Andrzej Sapkowski",
        age:46,
        id:2
    },
    {
        name:"Blizzard",
        age:52,
        id:1
    },
    {
        name:'Tim Patterson',
        age:38,
        id:3
    },
    {
        name:'Roger Zelazny',
        age:79,
        id:4
    },
    {
        name:'Orson Scott Card',
        age:60,
        id:5
    }
];

var games = [
    {
        id:'1', 
        title:"The Witcher",
        genre:"Adventure", 
        developer:"CD Projekt RED",
        platform:"PC",
        creator_id:1
    },
    {
        id:'2',  
        title:"Overwatch",
        genre:"First-Person Shooter",
        developer:"Battle.net",
        platform:"PC/Xbox One/PlayStation 4",
        creator_id:2
    },
    {
        id:'3',
        title:"Fortnite",
        genre:"Action",
        developer:"Epic Games",
        platform:"PC/Xbox One/PlayStation 4",
        creator_id:3
    },
    {
        id:'4',
        title:"League of Legends",
        genre:"Multiplayer Online Battle Arena (MOBA)",
        developer:"Riot Games",
        platform:"PC/Xbox One/PlayStation 4/Nintendo Switch",
        creator_id : 4

    },
    {
        id:'5',
        title:"Dota 2",
        genre:"Multiplayer Online Battle Arenas (MOBA)",
        developer:"Valve Corporation",
        platform:"PC/Xbox One/PlayStation 4",
        creator_id:5
    }
]

const CreatorType = new  GraphQLObjectType({
    name: 'Creator',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        age:  {type: GraphQLInt},
    })
});
const GameType = new  GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString},
        genre:  {type: GraphQLString},
        developer: {type:GraphQLString},
        platform:{type:GraphQLString},
        creator: {
            type: CreatorType,
            resolve(parent) {
                return _.find(creators,{id: parent.creator_id});
            }
        }
    })
});

const  RootQuery = new GraphQLObjectType({
   name : "RootQuery",
   fields:( )=>({
       gamebyid:{
            type: GameType,
            args:{id:{type:GraphQLID}} ,
            resolve(parent,args){
                return _.find(games,{id: args.id});
            }
        },

        removebyid:{
            type: GameType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args) {
               let result=_.remove(games,function(game){return game.id===args.id})
               if(!result[0]){throw new Error("Couldn't find game")}
               return result[0];
           }
        },
        
        gameslist:{
            type:new GraphQLList(GameType),
            resolve(parent,args){return games;}
        },

        creator:{
            type:CreatorType,
            args:{id: {type:GraphQLID}},
            resolve (parent,args) {
                return _.find(creators,{id: args.id});
            }
        }
     })
})

// function getGame(id) {
//     console.log("get game with ID ",id);
//     return {id:'1234567890',title:"The Witcher 3",description:`This is the story of Geralt of Rivia, a monster hunter from the kingdom of Dzangaard and Conrad.`,genre:"Adventure"}
    
// }

// function getGames() {
//     let arr=[];
//     for (let i=0 ;i<100;i++){
//         arr.push({
//             id:`${i}`,
//             title:`Game ${i}`
//         });
//     };
//     return arr;
// }

module.exports = new  GraphQLSchema({
    query: RootQuery
});