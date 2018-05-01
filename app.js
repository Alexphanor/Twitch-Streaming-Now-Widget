let users = ['ninja', 'Bungie', 'epicenter_ru', 'freecodecamp',
 'shroud', 'TSM_Myth', 'OverwatchLeague', 'noobs2ninjas'];

// Creating Arrays to store the necesary data
let nameArray = [];
let statusArray = [];
let logoArray = [];
let linkArray = [];

// Creating the variables attached to the UI Ids
for (let i = 0; i < users.length; i++) {
let userName = document.querySelector(`#placeholder${i}`);


// getting the Usernames in the UI
userName.textContent = '';
userName.textContent = users[i];
}

getTwitchUsersData();
getTwitchStreamsData();


// Getting data
async function getTwitchUsersData() {
  for(let i = 0; i < users.length; i++){
    await fetch(`https://wind-bow.gomix.me/twitch-api/users/${users[i]}`)
      .then((response) =>{
        return response.json();
      })
      .then((data)=> {   
          // Pushing  the data into the array
          logoArray.push(data.logo);
          // populate the UI with the logos
          let userLogo = document.querySelector(`#img${i}`);
          userLogo.setAttribute('src', logoArray[i]);
    })
    .catch((error)=>{
      console.log('There was an error', error);
    });
  }    
}


async function getTwitchStreamsData() {
  for ( let i = 0; i < users.length; i++) {
    await fetch(`https://wind-bow.gomix.me/twitch-api/streams/${users[i]}`)
    .then((response)=>{
      return response.json();
    })
  
    .then((data)=>{
      
      let userStatus = document.querySelector(`#status${i}`);
      let userInfo = document.querySelector(`#userInfo${i}`);
      let userLink = document.querySelector(`#userLink${i}`);

      //getting the profile urls
      linkArray.push(`https://www.twitch.tv/${users[i]}`); 
      
      //hooking the urls to the UI
      userLink.setAttribute("href", linkArray[i]);


      //generating the streamer status
      statusArray.push(
        data.stream ? data.stream.channel.status : 'offline'
      );
      userStatus.textContent = statusArray[i];    
        // conditional of on or offline
        if (data.stream === null) {
          userInfo.classList.add("offline");
          } else {
            // pushing the status into the array
            userInfo.classList.add("online");
               
      }
    })

    .catch((error)=>{
      console.log('there was an error:', error);
    });
  }  
}

  let all = document.querySelector('#option0');
  let online = document.querySelector('#option1');
  let offline = document.querySelector('#option2');

function activateButtons() {
  const userInfo = document.querySelectorAll(".userInfo");

  
    all.addEventListener('click', ()=> {
      for(let i = 0; i < userInfo.length; i++){
      userInfo[i].classList.remove('hidden');
      userInfo[i].classList.add('d-flex');
      }
    })    

    online.addEventListener('click', ()=> {
      for(let i = 0; i < userInfo.length; i++){
        if (userInfo[i].classList.contains("offline") === true){  
          userInfo[i].classList.remove("d-flex");
          userInfo[i].classList.add("hidden");
        } else {
          userInfo[i].classList.add('d-flex');
        }
      }
    })

    offline.addEventListener('click', ()=> {
      for(let i = 0; i < userInfo.length; i++){
        if (userInfo[i].classList.contains("online") === true){  
          userInfo[i].classList.remove("d-flex");
          userInfo[i].classList.add("hidden");
        } else {
          userInfo[i].classList.add('d-flex');
        }
      }
    })
}

activateButtons()

