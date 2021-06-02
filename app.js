const resultArea = document.querySelector(".result-area");
const ipArea = document.querySelector("#ip-add");
const locArea = document.querySelector("#loc");
const tzArea = document.querySelector("#tz");
const ispArea = document.querySelector("#isp");
const form = document.querySelector("form");
let ipEntry =document.querySelector("#input");

let ipAddress, loc, timezone, isp, lat, lng, mymap;


const getIp = async (ip) => {
    try {
        const res = await axios.get(
            `https://geo.ipify.org/api/v1?apiKey=at_6y4hZaThfol544mNMdw2R9QzZa6mM&ipAddress=${ip}`

        );
        ipAddress = res.data.ip;
        timezone = `UTC ${res.data.location.timezone}`;
        loc = `${res.data.location.city}, ${res.data.location.region} ${res.data.location.postalCode}`;
        lat = res.data.location.lat;
        isp = res.data.isp;
        lng = res.data.location.lng;

        ipArea.innerText=ipAddress;
        tzArea.innerText=timezone;
        locArea.innerText=loc;
        ispArea.innerText=isp;

        if (mymap) {
            mymap.remove();
            mymap = await L.map("mapid").setView([lat, lng], 11);
            L.tileLayer(
              `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
              {
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                  "pk.eyJ1Ijoic2FnaXR3aWciLCJhIjoiY2tpNzdyZjBhMDl2ejJycDJsMXg0Nnc0NyJ9.I2erlDtS2QRMYMhA_hytBQ",
              }
            ).addTo(mymap);
            var marker = L.marker([lat, lng]).addTo(mymap);
            marker.bindPopup(`${ipAddress} is here!`).openPopup();
          } else {
            mymap = await L.map("mapid").setView([lat, lng], 11);
            L.tileLayer(
              `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
              {
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                  "pk.eyJ1Ijoic2FnaXR3aWciLCJhIjoiY2tpNzdyZjBhMDl2ejJycDJsMXg0Nnc0NyJ9.I2erlDtS2QRMYMhA_hytBQ",
              }
            ).addTo(mymap);
            var marker = L.marker([lat, lng]).addTo(mymap);
            marker.bindPopup(`${ipAddress} is here!`).openPopup();
        }
        
    } catch (error) {
        alert(
            "somthing went wrong please make sure you enter a valid input and using chrome broweser"
        );
    }
};

const reset = (a, b, c, d) => {
    a.textContent = "";
    b.textContent = "";
    c.textContent = "";
    d.textContent = "";
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (ipEntry.value != '' && ipEntry.value != null) {
        getIp(ipEntry.value)
        return
    }
    else{
        alert("Enter the ip address");
    }
    
    reset(ipArea, locArea, tzArea, ispArea);
    
  });