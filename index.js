
let press = document.querySelector("#input");
      document.addEventListener("keydown", (e) => {
        if (e.key == "Enter" || e.key == "S") {
          fetchcity();
        }
      });

      async function fetchcity() {
        let cityname = document.getElementById("input1").value;
        let api1 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6febe02229c35165011877934abd1eec`
        );
        if (!cityname) alert("Type name of any city");
        let data1 = await api1.json();
        if (data1.cod !== 200) {
          alert("City not found. Please try again.");
          return;
        }
        displayWeather(data1);
        updateMap(cityname);
      }

      function displayWeather(obj) {
        document.querySelector("#tbody").innerText = "";
        let div1 = document.createElement("div");
        div1.setAttribute("id", "weatherdata");
        let head = document.createElement("h1");
        head.innerText = `Weather data in  ${obj.name}`;
        let p = document.createElement("h2");
        let currentTime = new Date().toLocaleTimeString();
        if (currentTime.charAt(currentTime.length - 2) == "P") {
          if (currentTime.charAt(0) >= 12 && currentTime.charAt(0) <= 5)
            p.innerText = `${currentTime} Good Afternoon`;
          else p.innerText = `${currentTime} Good Evening`;
        } else {
          if (currentTime.charAt(0) >= 12 && currentTime.charAt(0) <= 5)
            p.innerText = `${currentTime} Good Night`;
          else p.innerText = `${currentTime} Good Morning`;
        }
        let p1 = document.createElement("p");
        p1.innerText = `Max_temp : 🔥 ${obj.main.temp_max}F`;
        let p2 = document.createElement("p");
        p2.innerText = `Min_temp : 🌡 ${obj.main.temp_min}F`;
        let p3 = document.createElement("p");
        p3.innerText = `Weather : ${obj.weather[0].description}`;
        let p4 = document.createElement("p");
        p4.innerText = `Wind speed : 💨 ${obj.wind.speed}Km/hr`;
        let p5 = document.createElement("p");
        p5.innerText = `Sunrise : ⛅ ${obj.sys.sunrise}  and Sunset :🌆 ${obj.sys.sunset}`;
        div1.append(head, p, p1, p2, p3, p4, p5);
        document.querySelector("#tbody").append(div1);
      }

      function updateMap(name) {
        let map = document.createElement("div");
        map.setAttribute("id", "gmap");
        let iframe = document.createElement("iframe");
        iframe.setAttribute("id", "gmap_canva");
        iframe.src = `https://maps.google.com/maps?q=${name}%20&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        map.append(iframe);
        document.querySelector("#tbody").append(map);
      }

      function toggleTheme() {
        document.body.classList.toggle("light-mode");
        document.getElementById("themeSwitch").classList.toggle("active");
      }