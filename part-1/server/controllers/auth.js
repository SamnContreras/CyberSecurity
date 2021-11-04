const bcrypt = require("bcryptjs");
const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        const authenication = bcrypt.compareSync(password, users[i].passwordHash)
        if (authenication) {
          let userReturn = {...users[i]};
          delete userReturn.passwordHash;
          res.status(200).send(userReturn);
        }
      }
      res.status(400).send("User not found.")
    },

    register: (req, res) => {
      const {username, email, firstName, lastName, password} = req.body
      const salt = bcrypt.genSaltSync(5) 
      console.log(salt);
      const passwordHash = bcrypt.hashSync(password, salt) 
      console.log(passwordHash);

      let user = { //info from the index.html/website
        username,
        email,
        firstName,
        lastName,
        passwordHash,
      }

      users.push(user);
      let userReturn = {...user};
      delete userReturn.passwordHash;
      res.status(200).send(userReturn)

        // console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)
        // res.status(200).send(req.body)
        // console.log(users)
    }

}

//number cipher
//9 1215225 31825162015718116825

//Cybersecurity research
// Twitch getting hacked,
// all twitch got hacked to the point that all their software was avable to be downloaded in git.
// from what i read there wasnt a reason. The hacker i think wanted to expose twitch and how much Jeff paid to protect the software