const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/tHyfe9Pfn/",
});

model
  .classify({
    imageUrl:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fintietkiem.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fthung-giay-carton-duoc-su-dung-rong-rai-trong-cac-linh-vuc.jpg&imgrefurl=https%3A%2F%2Fintietkiem.com%2Fcac-loai-giay-lam-thung-carton%2F&tbnid=LT3Tyguk1oki2M&vet=12ahUKEwjns4Xu04r7AhXFJaYKHdeoAsAQMygEegUIARDDAQ..i&docid=ffZ6WqC94XFHYM&w=640&h=480&q=th%C3%B9ng%20gi%E1%BA%A5y%20carton&ved=2ahUKEwjns4Xu04r7AhXFJaYKHdeoAsAQMygEegUIARDDAQ",
  })
  .then((predictions) => {
    console.log("Predictions:", predictions);
  })
  .catch((e) => {
    console.log("ERROR", e);
  });
