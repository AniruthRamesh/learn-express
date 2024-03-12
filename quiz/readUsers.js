const express = require('express')
const router = express.Router();
import { addMsgToRequest } from './server';

router.get('/usernames', (req,res) => {
  let usernames = req.users.map(function(user) {
    return {id: user.id, username: user.username};
  });
  res.send(usernames);
});

router.get('/usernames/:input',addMsgToRequest, (req,res)=>{
  const usern = req.params.input;
  try{
    console.log(usern)
    const userObj = req.users.filter((user) => {
      return user.username === usern
    })
    if(userObj.length === 0) res.send({error : `There is no user with username ${usern}`});
    else res.json(userObj)

  }
  catch(error){
    res.send({
      error: {message: 'users not found', status: 404}
  });
  }
})

export default router;