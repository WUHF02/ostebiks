document.addEventListener("DOMContentLoaded", function() {
  const imgTemplate = document.getElementById("imgTemplate");
  let gallery = document.querySelector(".gallery")

  const params = new URLSearchParams(window.location.search);
  const skuId = params.get("sku");

  const db = firebase.firestore();

  let docRef = db.collection("bread").doc(skuId);

  docRef.get().then(function(doc) {
    const container = document.getElementsByClassName("page")[0];
    container.querySelector("h1").innerText = doc.data().name;
    container.querySelector(".price").innerText = `${doc.data().price} DKK`;
    container.querySelector(".country").innerText = doc.data().country;
    container.querySelector(".weight").innerText = doc.data().weight;
    let count = 0
    doc.data().image.forEach(() => {
      const clone = imgTemplate.content.cloneNode(true);
      clone.querySelector("img").src = `/assets/images/${doc.data().image[count]}`;
      gallery.appendChild(clone); 
      count++
    });
    container.querySelector(".gallery__large").src = `/assets/images/${
      doc.data().image[0]
    }`;
/*     container.querySelectorAll(".gallery__small")[0].src = `/assets/images/${
      doc.data().image[0]
    }`;
    container.querySelectorAll(".gallery__small")[1].src = `/assets/images/${
      doc.data().image[1]
    }`;
    container.querySelectorAll(".gallery__small")[2].src = `/assets/images/${
      doc.data().image[2]
    }`; */
    container.querySelectorAll(".gallery__small").forEach(function(img) {
      img.addEventListener("click", function() {
        container.querySelector(".gallery__large").src = this.src;
      });
    });
  });
});
