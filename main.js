let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let search = document.getElementById("search").value;

  let username = search.split(" ").join("");

  document.getElementById("result").innerHTML = "";

  const array = [
    fetch("https://api.github.com/users/" + username),
    fetch("https://api.github.com/users/" + username + "/repos"),
    fetch("https://api.github.com/users/" + username + "/gists"),
  ];

  async function main() {
    const res = await Promise.all(array);
    const data = await Promise.all(
      res.map((item) => {
        return item.json();
      })
    );
    console.log(data);

    document.getElementById("result").innerHTML = `
   
    <div>
        <a href="https://github.com/${username}" target="_blank">  
        <img class="avatar" src="${data[0].avatar_url}" />
        </a>

        <h2>${data[0].name !== null ? data[0].name : username}</h2>


        <div>
        <p>${data[0].bio !== null ? data[0].bio : ""}</p> 
        
        <p>${'<i class="fa-solid fa-user-group"></i> '}${
      data[0].followers
    } followers  ·  ${data[0].following} following</p>
         </div>

        <div>
        <p>${
          data[0].location !== null
            ? '<i class="fa-solid fa-location-dot"></i> '
            : ""
        }${data[0].location !== null ? data[0].location : ""}</p>

        <p>${
          data[0].company !== null
            ? '<i class="fa-solid fa-building"></i> '
            : ""
        }${data[0].company !== null ? data[0].company : ""}</p>

          <a href="${data[0].blog}" target="_blank" ><p>${
      data[0].blog !== "" ? '<i class="fa-solid fa-link"></i> ' : ""
    }${data[0].blog !== "" ? data[0].blog : ""}</p></a>

        <a href="mailto:${data[0].email}" target="_blank"><p>${
      data[0].email !== null ? '<i class="fa-solid fa-envelope"></i> ' : ""
    }${data[0].email !== null ? data[0].email : ""}</p></a>

        <a href='https:www.twitter.com/@${
          data[0].twitter_username
        }' target='_blank' ><p>${
      data[0].twitter_username !== null
        ? '<i class="fa-brands fa-twitter"></i> '
        : ""
    }${
      data[0].twitter_username !== null ? data[0].twitter_username : ""
    }</p></a>

        </div>

    </div>

    <div class="repos-gists-container">

    <div class="repos">
        <p>${'<i class="fa-solid fa-book"></i> '}${
      data[1].length
    } Repositories</p>
        <ul>
            ${data[1]
              .map((item) => {
                return `<a href="${
                  item.html_url
                }" target=_blank><li class="repo-name">${item.name}</li></a>
            <li class="repo-description">${
              item.description !== null ? item.description : ""
            }</li>`;
              })
              .join("")}
      </ul>
    </div>
    
    <div class="gists">
        <p>${'<i class="fa-solid fa-file-code"></i> '}${
      data[2].length
    } Gists</p>
       <ul>
          ${data[2]
            .map((item) => {
              return `<a href="${
                item.html_url
              }" target=_blank><li class="gists-description">${
                item.description !== null ? item.description : ""
              }</li></a>`;
            })
            .join("")}
       </ul>
    </div>
    </div>
        `;
  }

  main();
});
