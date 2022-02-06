const {v4} = require('uuid');
/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  let rooms;
  let players;
  let messages;

  if(await Game.count()<6){
    await Game.createEach([
      {name:'Wie ben ik?', link: '/wiebenik'},
      {name:'Wat is dit?', link: '/watisdit'},
      {name:'Triviant', link: '/triviant'},
      {name:'Telepathie', link: '/telepathie'},
      {name:'Maak de zin af', link: '/maakdezinaf'},
      {name:'Goed of fout?', link: '/goedfout'},
    ]);
  }

  if(await Room.count()<5){
    rooms = await Room.createEach([
      {code:await sails.helpers.gencode()},
      {code:await sails.helpers.gencode()},
      {code:await sails.helpers.gencode()},
      {code:await sails.helpers.gencode()},
      {code:await sails.helpers.gencode()},
    ]).fetch();
  }

  if(await Player.count()<30 && rooms){
    let roomidx = 0;
    let isHost = true;

    for(let i=1; i<31; i++){

      if((i%6)===0){
        isHost = true;
      }
      await Player.create(
        {secret: v4(), name: `dummy_player_${i}`, isHost: isHost, room: rooms[roomidx].id}
      );

      if((i%6)===0){
        roomidx++;
      }
      isHost=false;
    }
    players = await Player.find();
  }

  const randomchars = ()=>{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = [];
    for(let i=0; i<16; i++){
      result.push(chars[Math.floor(Math.random()*chars.length)]);
    }
    return result.join('');
  };

  if(await Message.count()<150 && players){
    for(let i=0; i<151; i++){
      await Player.say(players[Math.floor(Math.random()*players.length)].id,randomchars());
    }
  }

};
