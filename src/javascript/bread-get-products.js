document.addEventListener("DOMContentLoaded", function() {
  const cardTemplate = document.getElementById("cardTemplate");
  const list = document.getElementsByClassName("cardList")[0];

  const db = firebase.firestore();

  db.collection("bread")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data()); 
        const clone = cardTemplate.content.cloneNode(true);
        clone.querySelector("h1").innerText = doc.data().name;
        clone.querySelector(".weight").innerText = doc.data().weight;
        clone.querySelector(".price").innerText = `${doc.data().price} DKK`;
        clone.querySelector(".country").innerText = doc.data().country;
        clone.querySelector("img").src = `/assets/images/${doc.data().image[0]}`;
        clone.querySelector("a").href = `/brodet/?sku=${doc.id}`;
        list.appendChild(clone);
      });
    });
});
